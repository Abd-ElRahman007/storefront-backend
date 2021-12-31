import bcrypt from 'bcrypt';
import client from '../database';
import { PoolClient } from 'pg';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type user = {
  username: string;
  password: string;
  email: string;
};
export class UsersStore {
  
 }

