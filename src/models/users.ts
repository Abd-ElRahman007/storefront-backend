import bcrypt from 'bcrypt';
import client from '../database';
import { PoolClient } from 'pg';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type user = {
  id?: number;
  firstnameNew?: string;
  firstname: string;
  password?: string;
  lastname?: string;
  token?: string;
};
export class UsersStore {
  async index(): Promise<user[]> {
    const sql = 'SELECT * FROM users';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql);
    const users = result.rows;
    conn.release();
    return users;
  }
  async show(firstname: string): Promise<user | null> {
    if (!firstname) {
      throw new Error('firstname is required');
    }
    const sql = 'SELECT * FROM users WHERE firstname = $1';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql, [firstname]);
    if (result.rows.length) {
      const user = result.rows[0];
      conn.release();
      return user;
    } else {
      conn.release();
      return null;
    }
  }
  async create(u: user): Promise<user> {
    if (!u.firstname || !u.password || !u.lastname) {
      throw new Error('firstname, password, and lastname are required');
    }

    if (await this.show(u.firstname)) {
      throw new Error('firstname already exists');
    } else {
      try {
        const user = {
          firstname: u.firstname,
          lastname: u.lastname,
          password: bcrypt.hashSync(u.password + pepper, parseInt((saltRounds as unknown) as string))
        };
        const sql = 'INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [user.firstname, user.lastname, user.password]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot add new user ${u.firstname}. error: ${error}`);
      }
    }
  }
async createId(u: user): Promise<user> {
    if (!u.firstname || !u.password || !u.lastname) {
      throw new Error('firstname, password, and lastname are required');
    }
      try {
        const user = {
          id:u.id,
          firstname: u.firstname,
          lastname: u.lastname,
          password: bcrypt.hashSync(u.password + pepper, parseInt((saltRounds as unknown) as string))
        };
        const sql = 'INSERT INTO users (id,firstname,lastname,password) VALUES ($1,$2,$3,$4) RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [user.id,user.firstname, user.lastname, user.password]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot add new user ${u.firstname}. error: ${error}`);
      }

  }

  async showId(id: number): Promise<user | null> {
    if (!id) {
      throw new Error('id is required');
    }
    const sql = 'SELECT * FROM users WHERE id = $1';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql, [id]);
    if (result.rows.length) {
      const user = result.rows[0];
      conn.release();
      return user;
    } else {
      conn.release();
      return null;
    }
  }
  async update(u: user): Promise<user> {
    if (!u.firstname || !u.password) {
      throw new Error('firstname and password are required');
    }
    if (!await this.authenticate(u.firstname, u.password)) {
      throw new Error('entered password is incorrect');
    }
    if (!await this.show(u.firstname)) {
      throw new Error('firstname does not exist');
    } else {
      try {
        const user = {
          firstname: u.firstname,
          usernameNew: u.firstnameNew
        };
        const sql = 'UPDATE users SET firstname = $1 WHERE firstname = $2 RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [user.usernameNew, user.firstname]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot update user ${u.firstname}. error: ${error}`);
      }
    }
  }
  async delete(firstname: string, password: string): Promise<user | null> {
    if (!firstname || !password) {
      throw new Error('firstname and password is required');
    }
    if (!await this.show(firstname)) {
      throw new Error('firstname does not exist');
    }
    if (!await this.authenticate(firstname, password)) {
      throw new Error('entered password is incorrect');
    }
    try {
      const sql = 'DELETE FROM users WHERE firstname = $1 RETURNING *';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [firstname]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot delete user ${firstname}. error: ${error}`);
    }

  }
  async authenticate(firstname: string, password: string): Promise<user | null> {
    if (!firstname || !password) {
      throw new Error('firstname and password are required');
    }
    const user = await this.show(firstname);
    if (!user) {
      throw new Error('firstname does not exist');
    } else {
      try {
        const sql = 'SELECT password FROM users WHERE firstname = $1';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [firstname]);
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
        throw new Error(`cannot authenticate user ${firstname}. ${error}`);
      }
      return null;
    }
  }
}

