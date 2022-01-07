import { PoolClient } from "pg";
import client from "../database";


export type productOrders = {
  product_id: number;
  order_id: number;
  quantity: number;
}
export class DashboardQueries {
  async create(o: productOrders): Promise<productOrders> {
    if (!o.product_id || !o.order_id || !o.quantity) {
      throw new Error('product_id, order_id and quantity are required');
    }
    try {
      const productOrder = {
        product_id: o.product_id,
        order_id: o.order_id,
        quantity: o.quantity
      };
      const sql = 'INSERT INTO products_order (product_id,order_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [productOrder.product_id, productOrder.order_id, productOrder.quantity]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add new productOrder ${o.product_id}. error: ${error}`);
    }
  }
  async showOrders(id: productOrders): Promise<productOrders |null> {
    if (!id) {
      throw new Error('id is required');
    }
    try {
      const conn = await client.connect();
      const sql = `select * from products_order where id=${id}`;
      const result = await conn.query(sql);
      if (result.rows.length) {
        conn.release();
        return result.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (error) {
      throw new Error(`cannot get product_orders with id: ${error}`);
    }
  }
  async indexOrder(): Promise<productOrders[]> {
    try {
      const sql = `select * from products_order`;
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get orders: ${error}`);
    }
  }
  async deleteOrder(id: number): Promise<productOrders | string> {
    if (!id) {
      throw new Error('id is required');
    }
    try {
      const sql = `delete from products_order where id=${id}`;
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return `deleted`;
    } catch (error) {
      throw new Error(`cannot delete product_orders with id: ${error}`);
    }
  }

  async productsInOrder(): Promise<{ name: string, quantity: number, order_id: string }[]> {
    try {
      const conn = await client.connect();
      const sql = `select name,quantity,order_id from enchanted_stuff inner join products_order on enchanted_stuff.id=products_order.product_id`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products and orders: ${error}`);
    }
  }
  async usersWithOrders(): Promise<{ username: string, email: string }[]> {
    try {
      const conn = await client.connect();
      const sql = `select firstname,lastname from users inner join orders on users.id=orders.id_user`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users with orders: ${error}`);
    }
  }
}
