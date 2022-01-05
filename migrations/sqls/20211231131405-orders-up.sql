CREATE TABLE
  orders(
    id serial PRIMARY KEY,
    id_user INTEGER REFERENCES users(id),
    status VARCHAR(10)
  );
