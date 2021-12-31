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
}= process.env;
if(ENV==='test'){
  const client: Pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    password: POSTGRES_PASSWORD
  });
} else {
  const client: Pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD
  });
}
export default client;
