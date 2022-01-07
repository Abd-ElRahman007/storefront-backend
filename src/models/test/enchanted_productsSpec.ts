import { product, ProductsStore } from '../enchanted_products';
import supertest from 'supertest';
import app from '../../server';
import { UsersStore } from '../users';

const request = supertest(app);
const store: ProductsStore = new ProductsStore();

describe('enchanted_products store model', (): void => {
  it('should index method be defined', (): void => {
    expect(store.index).toBeDefined();
  });
  it('should show method be defined', (): void => {
    expect(store.show).toBeDefined();
  });
  it('should create method be defined', (): void => {
    expect(store.create).toBeDefined();
  });
})
describe('enchanted_products store handlers', (): void => {
  it('should create method create a product', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const resultuser = await request.post('/users/create').send(user);
    const key = await request.post('/users/createToken').send(user);
    const product = {
      name: 'test',
      price: 5,
    };
    const result = await request.post('/products/create').set('Authorization', `Bearer ${key.text}`).send(product);
    expect(result.status).toBe(200);
    done();
  });
  it('should index method index all products', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test',
    }
    const key = await request.post('/users/createToken').send(user);
    const result = await request.get('/products').set('Authorization', `Bearer ${key.text}`);
    expect(result.status).toBe(200);
    done();
  });
  it('should show method show a product', async (done): Promise<void> => {
    const product = {
      name: 'test'
    };
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.post('/products/show').set('Authorization', `Bearer ${key.text}`).send(product);
    expect(result.status).toBe(200);
    done();
  });
  it('should delete method delete a product', async (done): Promise<void> => {
    const product = {
      name: 'test'
    };
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.delete('/products/delete').set('Authorization', `Bearer ${key.text}`).send(product);
    const resultuser = await request.delete('/users/delete').set('Authorization', `Bearer ${key.text}`).send(user);
    expect(result.status).toBe(200);
    done();
  });
})


