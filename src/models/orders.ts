import client from '../database'
import { PoolClient } from 'pg';

export type order = {
  id_product: number;
  quantity: number;
  id_user?: number;
  status: string;
  token?: string;
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
  async show(id_product: number): Promise<order | null> {
    if (!id_product) {
      throw new Error('id_product is required');
    }
    const sql = 'SELECT * FROM orders WHERE id_product = $1';
    const conn: PoolClient = await client.connect();
    const result = await conn.query(sql, [id_product]);
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
    if (!o.id_product || !o.quantity || !o.id_user || !o.status) {
      throw new Error('id_product, quantity and status are required');
    }
    if (await this.show(o.id_product)) {
      throw new Error('id_product already exists');
    } else {
      try {
        const order = {
          id_product: o.id_product,
          quantity: o.quantity,
          id_user: o.id_user,
          status: o.status
        };
        const sql = 'INSERT INTO orders (id_product,quantity,id_user,status) VALUES ($1,$2,$3,$4) RETURNING *';
        const conn: PoolClient = await client.connect();
        const result = await conn.query(sql, [order.id_product, order.quantity, order.id_user, order.status]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`cannot add new order ${o.id_product}. error: ${error}`);
      }
    }
  }
  async delete(id_product: number): Promise<order> {
    if (!id_product) {
      throw new Error('id_product is required');
    }
    if (!await this.show(id_product)) {
      throw new Error('id_product does not exist');
    } try {
      const sql = 'DELETE FROM orders WHERE id_product = $1 RETURNING *';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [id_product]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot delete order ${id_product}. error: ${error}`);
    }
  }
}

