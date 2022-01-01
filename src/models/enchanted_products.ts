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
  
}
