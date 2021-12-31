import bcrypt from 'bcrypt';
import client from '../database';
import { PoolClient } from 'pg';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type user = {
  username: string;
  password?: string;
  email?: string;
};
export class UsersStore {
  async index(): Promise<user[]> {
    const conn: PoolClient = await client.connect();
    const sql = 'SELECT * FROM users';
    const result = await conn.query(sql);
    const users = result.rows;
    conn.release();
    return users;
  }
  async show(username: string): Promise<user | null> {
    const conn: PoolClient = await client.connect();
    const sql = 'SELECT * FROM users WHERE username = $1';
    const result = await conn.query(sql, [username]);
    const users = result.rows[0];
    conn.release();
    return users;
  }
  async create(u: user): Promise<user> {
    if (!u.username || !u.password || !u.email) {
      throw new Error('username, password, and email are required');
    }
    if (await this.show(u.username)) {
      throw new Error('username already exists');
    } else {
      try {
        const user = {
          username: u.username,
          email: u.email,
          password: bcrypt.hashSync(u.password + pepper, parseInt((saltRounds as unknown) as string))
        };
        const sql = 'INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [user.username, user.email, user.password]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot add new user ${u.username}. error: ${error}`);
      }
    }
  }
  async update(u: user, uNew: user): Promise<user> {
    if (!u.username || !u.password) {
      throw new Error('username and password are required');
    }
    if (!await this.show(u.username)) {
      throw new Error('username does not exist');
    } else {
      try {
        const user = {
          username: u.username,
          password: bcrypt.hashSync(u.password + pepper, parseInt((saltRounds as unknown) as string))
        };
        const sql = 'UPDATE users SET username = $1, password = $2 WHERE username = $3 RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [user.username, user.password, uNew.username]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot update user ${u.username}. error: ${error}`);
      }
    }
  }
  async delete(username: string): Promise<user | null> {
    if (!username) {
      throw new Error('username is required');
    }
    if (!await this.show(username)) {
      throw new Error('username does not exist');
    } else {
      try {
        const sql = 'DELETE FROM users WHERE username = $1 RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [username]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot delete user ${username}. error: ${error}`);
      }
    }
  }
  async authenticate(username: string, password: string): Promise<user | null> {
    if (!username || !password) {
      throw new Error('username and password are required');
    }
    const user = await this.show(username);
    if (!user) {
      throw new Error('username does not exist');
    } else {
      try {
        const sql = 'SELECT password FROM users WHERE username = $1';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [username]);
        conn.release();
        const user = result.rows[0];
        if (result.rows.length) {
          if (bcrypt.compareSync(password + pepper, user.password)) {
            return user;
          } else {
            throw new Error('password is incorrect');
          }
        }
      } catch (error) {
        throw new Error(`cannot authenticate user ${username}. error: ${error}`);
      }
      return null;
    }
  }
}

