import client from "../database";

export class DashboardQueries {
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
