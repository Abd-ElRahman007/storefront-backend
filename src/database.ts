import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  ENV
} = process.env;
const client = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
});
export default client;
