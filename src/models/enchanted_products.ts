import { PoolClient } from "pg";
import client from "../database";

export type product = {
  name: string;
  price: number;
  token?: string;
}

export class ProductsStore {
  async index(): Promise<product[]> {
    try {
      const sql = 'SELECT * FROM enchanted_stuff;';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
  async show(name: string): Promise<product | null> {
    if (!name) {
      throw new Error(`cannot find product with empty name`);
    }
    try {
      const sql = 'SELECT * FROM enchanted_stuff WHERE name = $1;';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [name]);
      if (result.rows.length) {
        conn.release();
        return result.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (error) {
      throw new Error(`cannot find product name ${name}, error:${error}`);
    }
  }
  async create(product: product): Promise<product> {
    if (!product.name || !product.price) {
      throw new Error(`cannot add new product and price with empty fields`);
    }
    if (await this.show(product.name)) {
      throw new Error(`cannot add new product with name ${product.name}, it already exists`);
    }
    try {
      const sql = 'INSERT INTO enchanted_stuff (name,price) VALUES ($1,$2) RETURNING *;';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [product.name, product.price]);
      const books = result.rows[0];
      conn.release();
      return books;
    } catch (error) {
      throw new Error(`cannot add new product title ${product.name}. error: ${error}`);
    }
  }
}
