import client from '../database'
import { PoolClient } from 'pg';

export type order = {
  id_user?: number;
  status: string;
}

export class OrdersStore {
  async index(): Promise<order[]> {
    const sql = 'SELECT * FROM orders';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql);
    const orders = result.rows;
    conn.release();
    return orders;
  }
  async show(id_user: number): Promise<order | null> {
    if (!id_user) {
      throw new Error('id_user is required');
    }
    const sql = 'SELECT * FROM orders WHERE id_user = $1';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql, [id_user]);
    if (result.rows.length) {
      const order = result.rows[0];
      conn.release();
      return order;
    } else {
      conn.release();
      return null;
    }
  }
  async create(o: order): Promise<order> {
    if (!o.id_user || !o.status) {
      throw new Error('id_user and status are required');
    }
    if (await this.show(o.id_user)) {
      throw new Error('id_user already exists');
    } else {
      try {
        const order = {
          id_user: o.id_user,
          status: o.status
        };
        const sql = 'INSERT INTO orders (id_user,status) VALUES ($1,$2) RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [order.id_user, order.status]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot add new order ${o.id_user}. error: ${error}`);
      }
    }
  }
  async delete(id_user: number): Promise<order> {
    if (!id_user) {
      throw new Error('id_user is required');
    }
    if (!await this.show(id_user)) {
      throw new Error('id_user does not exist');
    } try {
      const sql = 'DELETE FROM orders WHERE id_user = $1 RETURNING *';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [id_user]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot delete order ${id_user}. error: ${error}`);
    }
  }
}

