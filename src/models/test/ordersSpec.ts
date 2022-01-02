import { order, OrdersStore } from '../../models/orders';
import supertest  from 'supertest';
import app from '../../server';

const request = supertest(app);
const store: OrdersStore = new OrdersStore();

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
describe('orders store handlers', (): void => {

});
