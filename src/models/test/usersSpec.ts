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
      password: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbnFoTlViWnh4SVN2Vmw0SzNBdWp6LjJEa3RlSHppYUV5SHBuLkVadnlpd0pHYWhpVUR2b2UifSwiaWF0IjoxNjQxMDg4NTM4fQ.3L0X1zZkFtVfRKnRs5qdGEj77h3AfPynXWa7AAU0dUw'
    };
    const result = await request.get('/users/auth').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should update method update a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      firstnameNew: 'new',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbnFoTlViWnh4SVN2Vmw0SzNBdWp6LjJEa3RlSHppYUV5SHBuLkVadnlpd0pHYWhpVUR2b2UifSwiaWF0IjoxNjQxMDg4NTM4fQ.3L0X1zZkFtVfRKnRs5qdGEj77h3AfPynXWa7AAU0dUw'
    };
    const result = await request.put('/users/update').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should show method show a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbnFoTlViWnh4SVN2Vmw0SzNBdWp6LjJEa3RlSHppYUV5SHBuLkVadnlpd0pHYWhpVUR2b2UifSwiaWF0IjoxNjQxMDg4NTM4fQ.3L0X1zZkFtVfRKnRs5qdGEj77h3AfPynXWa7AAU0dUw'
    };
    const result = await request.get('/users/show').send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should delete method delete a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new',
      password: 'test',
      lastname: 'test',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmIkMTAkbnFoTlViWnh4SVN2Vmw0SzNBdWp6LjJEa3RlSHppYUV5SHBuLkVadnlpd0pHYWhpVUR2b2UifSwiaWF0IjoxNjQxMDg4NTM4fQ.3L0X1zZkFtVfRKnRs5qdGEj77h3AfPynXWa7AAU0dUw'
    };
    const result = await request.delete('/users/delete').send(user);
    expect(result.status).toBe(200);
    done();
  });
})
