import { product, ProductsStore } from '../enchanted_products';
import supertest from 'supertest';
import app from '../../server';

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
xdescribe('enchanted_products store handlers', (): void => {
  it('should create method create a product', async (done): Promise<void> => {
    const product = {
      name: 'test',
      price: 5,
      token: ""//supply a token here
    };
    const result = await request.post('/products/create').send(product);
    expect(result.status).toBe(200);
    done();
  });
  it('should show method show a product', async (done): Promise<void> => {
    const product = {
      name: 'test'
    };
    const result = await request.get('/products/show').send(product);
    expect(result.status).toBe(200);
    done();
  });
  it('should delete method delete a product', async (done): Promise<void> => {
    const product = {
      name: 'test',
      token: ""//supply a token here
    };
    const result = await request.delete('/products/delete').send(product);
    expect(result.status).toBe(200);
    done();
  });
})

describe('enchanted_products store handlers without token', (): void => {
  it('should create method without token give an error', async (done): Promise<void> => {
    const product = {
      name: 'test',
      price: 5
    };
    const result = await request.post('/products/create').send(product);
    expect(result.status).toBe(401);
    done();
  });
  it('should show method give an error no product is exist', async (done): Promise<void> => {
    const product = {
      name: 'test'
    };
    const result = await request.post('/products/show').send(product);
    expect(result.body).toBeFalsy();
    done();
  })
  it('should delete method give an error no product is exist', async (done): Promise<void> => {
    const product = {
      name: 'test'
    };
    const result = await request.delete('/products/delete').send(product);
    expect(result.status).toBe(401);
    done();
  })
})

