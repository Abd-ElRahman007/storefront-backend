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
  it('should index method be defined', (): void => {
    expect(store.index).toBeDefined();
  });
  it('should show method be defined', (): void => {
    expect(store.show).toBeDefined();
  });
  it('should create method be defined', (): void => {
    expect(store.create).toBeDefined();
  });
  it('should delete method be defined', (): void => {
    expect(store.delete).toBeDefined();
  });
})
xdescribe('orders store handlers', (): void => {
  it('should create method create an order', async (done) => {
    const orderuser = {
      id: 99,
      firstname: 'test2',
      password: 'test2',
      lastname: 'test2',
    }
    const user_ = await users_store.createId(orderuser);
    const orderProduct = {
      id: 55,
      name: 'test2',
      price: 1,
    }
    const prod_ = await products_store.createId(orderProduct);
    const order: order = {
      id_product: 55,
      quantity: 1,
      status: 'active',
      token: ''//supply a token here
    };
    const response = await request.post('/orders/create/99').send(order);
    expect(response.status).toBe(200);
    done();
  });
  it('should show method show an order', async (done) => {
    const id_product = 1;
    const response = await request.get('/orders/show').send({ id_product });
    expect(response.status).toBe(200);
    done();
  });
  it('should delete method delete an order', async (done) => {
    const order = {
      id_product: 55,
      token: ''//supply a token here
    }
    const response = await request.delete('/orders/delete').send(order);
    expect(response.status).toBe(200);
    const sql4 = 'DELETE FROM enchanted_stuff WHERE id = 55;';
    const sql3 = 'DELETE FROM users WHERE id = 99;';
    const conn2 = await client.connect();
    conn2.query(sql4);
    conn2.query(sql3);
    conn2.release();
    done();
  });
});
describe('order store handlers without token', (): void => {
  it('should create method without a token give an error', async (done) => {
    const order = {
      id_product: 55,
      quantity: 1,
      status: 'active',
    }
    const response = await request.post('/orders/create/99').send(order);
    expect(response.status).toBe(401);
    done();
  });
  it('should show method return null no order is made', async (done) => {
    const id_product = 1;
    const response = await request.get('/orders/show').send({ id_product });
    expect(response.body).toBeFalsy();
    done();
  });
  it('should delete method return error no order is made', async (done) => {
    const order = {
      id_product: 55,
    }
    const response = await request.delete('/orders/delete').send(order);
    expect(response.status).toBe(401);
    done();
  });
});
