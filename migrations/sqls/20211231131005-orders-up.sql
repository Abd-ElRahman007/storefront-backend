CREATE TABLE
  orders(
    id serial PRIMARY KEY,
    id_product INTEGER REFERENCES enchanted_products(id),
    quantity INTEGER NOT NULL,
    id_user INTEGER REFERENCES users(id),
    status VARCHAR(10)
  );
