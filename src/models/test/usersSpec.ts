import { user, UsersStore } from '../users';
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const store: UsersStore = new UsersStore();

describe('users store model', (): void => {
  it('should index method be defined', (): void => {
    expect(store.index).toBeDefined();
  });
  it('should show method be defined', (): void => {
    expect(store.show).toBeDefined();
  });
  it('should create method be defined', (): void => {
    expect(store.create).toBeDefined();
  });
  it('should update method be defined', (): void => {
    expect(store.update).toBeDefined();
  });
  it('should delete method be defined', (): void => {
    expect(store.delete).toBeDefined();
  });
  it('should create methode create a user', async (done): Promise<void> => {
    const user = {
      username: 'test',
      password: 'test',
      email: 'test'
    };
    const result = await request.post('/users').send(user);
    expect(result.status).toBe(200);
    done();
  });
})
