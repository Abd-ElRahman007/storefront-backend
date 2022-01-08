import { product, ProductsStore } from '../enchanted_products';
import supertest from 'supertest';
import app from '../../server';
import { UsersStore } from '../users';

const request = supertest(app);
const store: ProductsStore = new ProductsStore();

describe('enchanted_products store model', (): void => {
  it('should create method create a product',async ():Promise <void> => {
    const product = {
      name: 'test2',
      price: 99
    }
    const result = await store.create(product);
    expect(result.name).toBe('test2');
  });
  it('should index method index all product',async ():Promise <void> => {
    const result = await store.index();
    expect(result[0].name).toBe('test2');
  });
  it('should show method show a product',async ():Promise <void> => {
    const result = await store.show('test2');
    expect(result?.price).toBe(99);
  });
  it('should delete method delete a product', async (): Promise<void> => {
    const result = await store.delete('test2');
    expect(result.name).toBe('test2');
  });
  it('should createId method create a product', async (): Promise<void> => {
    const product = {
      id:30,
      name: 'test',
      price: 99
    }
    const result = await store.createId(product);
    expect(result.name).toBe('test');
  })
  it('should showId method show a product', async (): Promise<void> => {
    const result = await store.showId(30);
    expect(result?.name).toBe('test');
  });
  it('should delete method delete a product', async (): Promise<void> => {
    const product = {
      name: 'test',
      price: 99
    }
    const result = await store.delete(product.name);
    expect(result.name).toBe('test');
  })
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


