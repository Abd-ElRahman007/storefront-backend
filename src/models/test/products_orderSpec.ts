import { productOrders, DashboardQueries } from "../../service/dashboard";
import supertest from "supertest";
import app from "../../server";
import client from "../../database";


const request = supertest(app);
const store = new DashboardQueries();

describe('dashboard store model', () => {
  it('should create method be defined', async (): Promise<void> => {
    const sql = 'INSERT INTO users (id,firstname,password,lastname) VALUES (90,\'test3\',\'test3\',\'test3\');';
    const sql2 = 'INSERT INTO orders (id,id_user,status) VALUES (80,90,\'active\');';
    const sql3 = 'INSERT INTO enchanted_stuff (id,name,price) VALUES (50,\'teststuff\',10);';
    const conn = await client.connect();
    conn.query(sql);
    conn.query(sql3);
    conn.query(sql2);
    conn.release();
    const order = {
      product_id: 50,
      order_id: 80,
      quantity: 1,
    }
    const result = await store.create(order);
    expect(result.product_id).toBe(50);
  });
  it('should index method be defined', async (): Promise<void> => {
    const result = await store.indexOrders();
    expect(result[0].order_id).toBe(80);
  });
  it('should show method be defined', async (): Promise<void> => {
    const result = await store.showOrder(80);
    expect(result?.order_id).toBe(80);
  });
  it('should delete method be defined', async (): Promise<void> => {
    const result = await store.deleteOrder(80);
    expect(result).toBe('deleted');
    const sql4 = 'DELETE FROM orders WHERE id=80;';
    const sql5 = 'DELETE FROM enchanted_stuff WHERE id=50;';
    const sql6 = 'DELETE FROM users WHERE id=90;';
    const conn = await client.connect();
    conn.query(sql4);
    conn.query(sql5);
    conn.query(sql6);
    conn.release();
  });
})

describe('dashboard store handlers', () => {
  it('should create method be ok', async (done): Promise<void> => {
    const sql = 'INSERT INTO users (id,firstname,password,lastname) VALUES (90,\'test3\',\'test3\',\'test3\');';
    const sql2 = 'INSERT INTO orders (id,id_user,status) VALUES (80,90,\'active\');';
    const sql3 = 'INSERT INTO enchanted_stuff (id,name,price) VALUES (50,\'teststuff\',10);';
    const conn = await client.connect();
    conn.query(sql);
    conn.query(sql3);
    conn.query(sql2);
    conn.release();
    const orderuser = {
      id: 90,
      firstname: 'test3',
      password: 'test3',
      lastname: 'test3',
    };
    const key = await request.post('/users/createToken').send(orderuser);
    const product = {
      product_id: 50,
      order_id: 80,
      quantity: 1
    }
    const result = await request.post('/create-order').set('Authorization', `Bearer ${key.text}`).send(product);
    expect(result.status).toBe(200);
    done();
  })
  it('should show method be ok', async (done): Promise<void> => {
    const product = {
      product_id: 50,
      order_id: 80,
      quantity: 1
    }
    const orderuser = {
      id: 90,
      firstname: 'test3',
      password: 'test3',
      lastname: 'test3',
    }
    const key = await request.post('/users/createToken').send(orderuser);
    const result = await request.post('/show-order').set('Authorization', `Bearer ${key.text}`).send(product);
    expect(result.status).toBe(200);
    done();
  })
  it('should index method be ok', async (done): Promise<void> => {
    const orderuser = {
      id: 90,
      firstname: 'test3',
      password: 'test3',
      lastname: 'test3',
    }
    const key = await request.post('/users/createToken').send(orderuser);
    const result = await request.get('/index-orders').set('Authorization', `Bearer ${key.text}`);
    expect(result.status).toBe(200);
    done();
  })
  it('should productsInOrder method be ok', async (done): Promise<void> => {
    const result = await request.get('/products-in-orders');
    expect(result.status).toBe(200);
    done();
  })
  it('should usersWithOrders method be ok', async (done): Promise<void> => {
    const result = await request.get('/users-with-orders');
    expect(result.status).toBe(200);
    done();
  })
  it('should delete method be ok', async (done): Promise<void> => {
    const product = {
      product_id: 50,
      order_id: 80,
      quantity: 1
    }
    const orderuser = {
      id: 90,
      firstname: 'test3',
      password: 'test3',
      lastname: 'test3',
    }
    const key = await request.post('/users/createToken').send(orderuser);
    const result = await request.delete('/delete-order').set('Authorization', `Bearer ${key.text}`).send(product);
    console.log(result.body);
    expect(result.status).toBe(200);
    const sql4 = 'DELETE FROM orders WHERE id=80;';
    const sql5 = 'DELETE FROM enchanted_stuff WHERE id=50;';
    const sql6 = 'DELETE FROM users WHERE id=90;';
    const conn = await client.connect();
    conn.query(sql4);
    conn.query(sql5);
    conn.query(sql6);
    conn.release();
    done();
  })
})
