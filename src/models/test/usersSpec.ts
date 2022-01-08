import { user, UsersStore } from '../users';
import supertest from 'supertest';
import app from '../../server';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

const request = supertest(app);
const store: UsersStore = new UsersStore();

describe('users store model', (): void => {
  it('should create method in users to contain the user', async (): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    }
    const result = await store.create(user);
    expect(result.lastname).toBe(user.lastname);
  })
  it('should index method index all users', async (): Promise<void> => {
    const result = await store.index();
    expect(result[0].firstname).toBe('test');
  });
  it('should show method show a user', async (): Promise<void> => {
    const result = await store.show('test');
    expect(result?.firstname).toBe('test');
  });
  it('should update method update a user', async (): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test',
      firstnameNew: 'testNew'
    }
    const result = await store.update(user);
    expect(result.firstname).toBe(user.firstnameNew);
  });
  it('should delete method to delete a user', async (): Promise<void> => {
    const user = {
      firstname: 'testNew',
      password: 'test',
      lastname: 'test',
    }
    const result = await store.delete(user.firstname, user.password);
    expect(result?.firstname).toBe(user.firstname);
  });
  it('should createId model create a user', async (): Promise<void> => {
    const user = {
      id:35,
      firstname: 'test',
      password: 'test',
      lastname: 'test',
    }
    const result = await store.createId(user);
    expect(result.firstname).toBe(user.firstname);
  })
  it('should showId model show a user', async (): Promise<void> => {
    const result = await store.showId(35);
    expect(result?.firstname).toBe('test');
  });
  it('should delete model delete a user', async (): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test',
    }
    const result = await store.delete(user.firstname, user.password);
    expect(result?.firstname).toBe(user.firstname);
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
  it('should index method index all users', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test',
    }
    const key = await request.post('/users/createToken').send(user);
    const result = await request.get('/users').set('Authorization', `Bearer ${key.text}`);
    expect(result.status).toBe(200);
    done();
  })
  it('should createToken method recreate the token', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test',
    }
    const result = await request.post('/users/createToken').send(user);
    expect(result.status).toBe(200);
    done();
  })
  it('should authenticate method authenticate a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.post('/users/auth').set('Authorization', `Bearer ${key.text}`).send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should update method update a user', async (done): Promise<void> => {
    const user = {
      firstname: 'test',
      password: 'test',
      firstnameNew: 'new',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.put('/users/update').set('Authorization', `Bearer ${key.text}`).send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should show method show a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new',
      password: 'test',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.post('/users/show').set('Authorization', `Bearer ${key.text}`).send(user);
    expect(result.status).toBe(200);
    done();
  });
  it('should delete method delete a user', async (done): Promise<void> => {
    const user = {
      firstname: 'new',
      password: 'test',
      lastname: 'test'
    };
    const key = await request.post('/users/createToken').send(user);
    const result = await request.delete('/users/delete').set('Authorization', `Bearer ${key.text}`).send(user);
    expect(result.status).toBe(200);
    done();
  });
})
