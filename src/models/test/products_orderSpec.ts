import { productOrders, DashboardQueries } from "../../service/dashboard";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
const store = new DashboardQueries();

describe('dashboard store model', () => {
  it('should index method be defined', () => {
    expect(store.indexOrders).toBeDefined();
  });
  it('should show method be defined', () => {
    expect(store.showOrder).toBeDefined();
  });
  it('should create method be defined', () => {
    expect(store.create).toBeDefined();
  });
  it('should delete method be defined', () => {
    expect(store.deleteOrder).toBeDefined();
  });
})

describe('dashboard store handlers no token', () => {
  it('should create method no token be true', async (done): Promise<void> => {
    const product = {
      product_id: 44,
      order_id: 44,
      quantity: 1
    }
    const result = await request.post('/create-order').send(product);
    expect(result.status).toBe(401);
    done();
  })
  it('should show method no token be true', async (done): Promise<void> => {
    const product = {
      product_id: 44,
      order_id: 44,
      quantity: 1
    }
    const result = await request.post('/show-order').send(product);
    expect(result.status).toBe(401);
    done();
  })
  it('should index method be ok', async (done): Promise<void> => {
    const result = await request.get('/index-orders');
    expect(result.status).toBe(200);
    done();
  })
  it('should delete method no token be true', async (done): Promise<void> => {
    const product = {
      product_id: 44,
      order_id: 44,
      quantity: 1
    }
    const result = await request.delete('/delete-order').send(product);
    expect(result.status).toBe(401);
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
})
