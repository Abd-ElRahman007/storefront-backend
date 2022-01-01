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
})
describe('users store handlers', (): void => {
  it('should create method create a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const result = await request.post('/users/create').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should authenticate method authenticate a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test'
    };
    const result = await request.get('/users/auth').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should update method update a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      firstnameNew: 'new'
    };
    const result = await request.put('/users/update').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should show method show a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new'
    };
    const result = await request.get('/users/show').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should delete method delete a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new',
      password: 'test',
      lastname: 'test'
    };
    const result = await request.delete('/users/delete').send(user);
    expect(result.status).toBe(200);
    done();
  });
})
