CREATE TABLE
  orders(
    id serial PRIMARY KEY,
    status VARCHAR(10) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
  )
