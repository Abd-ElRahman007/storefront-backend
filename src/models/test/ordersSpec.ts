import { order, OrdersStore } from '../../models/orders';
import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import { user, UsersStore } from '../../models/users';
import { product, ProductsStore } from '../../models/enchanted_products';

const request = supertest(app);
const store: OrdersStore = new OrdersStore();
const users_store: UsersStore = new UsersStore();
const products_store: ProductsStore = new ProductsStore();

describe('orders store model', (): void => {
  it('should create method create an order',async (): Promise<void> => {
    const user = {
      id:54,
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const resultuser = await users_store.createId(user);
    const product = {
      name: 'test5',
      price: 5,
    };
    const result = await products_store.create(product);
    const order = {
      id_user: 54,
      status: 'active',
    };
    const resultorder = await store.create(order);
    expect(resultorder.id_user).toBe(54);
  });
  it('should index method index all orders',async (): Promise<void> => {
    const result = await store.index();
    expect(result[0].status).toBe('active');
  });
  it('should show method show an order',async (): Promise<void> => {
    const result = await store.show(54);
    expect(result?.id_user).toBe(54);
  });
  it('should delete method delete an order',async (): Promise<void> => {
    const result = await store.delete(54);
    const result2 = await users_store.delete('test', 'test');
    const result3 = await products_store.delete('test5');
    expect(result.id_user).toBe(54);
  });
})
describe('orders store handlers', (): void => {
  it('should create method create an order', async (done) => {
    const orderuser = {
      id: 99,
      firstname: 'test2',
      password: 'test2',
      lastname: 'test2',
    }
    const user_ = await users_store.createId(orderuser);
    const order: order = {
      status: 'active'
    };
      const key = await request.post('/users/createToken').send(orderuser);
    const response = await request.post('/orders/create/99').set('Authorization', `Bearer ${key.text}`).send(order);
    expect(response.status).toBe(200);
    done();
  });
  it('should index method index all orders', async (done) => {
    const orderuser = {
      id: 99,
      firstname: 'test2',
      password: 'test2',
      lastname: 'test2',
    }
    const key= await request.post('/users/createToken').send(orderuser);
    const response = await request.get('/orders').set('Authorization',`Bearer ${key.text}`);
    expect(response.status).toBe(200);
    done();
  });

  it('should show method show an order', async (done) => {
    const orderuser = {
      id: 99,
      firstname: 'test2',
      password: 'test2',
      lastname: 'test2',
    }
    const key = await request.post('/users/createToken').send(orderuser);
    const response = await request.post('/orders/show/99').set('Authorization', `Bearer ${key.text}`);
    expect(response.status).toBe(200);
    done();
  });
  it('should delete method delete an order', async (done) => {
    const orderuser = {
      id: 99,
      firstname: 'test2',
      password: 'test2',
      lastname: 'test2',
    }
    const key = await request.post('/users/createToken').send(orderuser);
    const response = await request.delete('/orders/delete/99').set('Authorization', `Bearer ${key.text}`);
    const sql4 = 'DELETE FROM enchanted_stuff WHERE id = 55;';
    const sql3 = 'DELETE FROM users WHERE id = 99;';
    const conn2 = await client.connect();
    conn2.query(sql4);
    conn2.query(sql3);
    conn2.release();
    expect(response.status).toBe(200);
    done();
  });
});

