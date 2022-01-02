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
describe('enchanted_products store handlers', (): void => {
  it('should create method create a product', async (done): Promise<void> => {
    const product = {
      name: 'test',
      price: 5,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbHVZWFFoNnFIOUg3STNZeHFiNi9lLkhldnY5N3JHSlA5Y0ZYYXJMZ2owc0loMzdKdkUwbnEifSwiaWF0IjoxNjQxMDg5MzIzfQ.sh8TGBNBkAAs37rOFqSwe6Ccd1Y4X94Eve3xWFl896I"
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
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbHVZWFFoNnFIOUg3STNZeHFiNi9lLkhldnY5N3JHSlA5Y0ZYYXJMZ2owc0loMzdKdkUwbnEifSwiaWF0IjoxNjQxMDg5MzIzfQ.sh8TGBNBkAAs37rOFqSwe6Ccd1Y4X94Eve3xWFl896I"
    };
    const result = await request.delete('/products/delete').send(product);
    expect(result.status).toBe(200);
    done();
  });
})

