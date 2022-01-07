CREATE TABLE products_order(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES enchanted_stuff(id),
  order_id INTEGER NOT NULL REFERENCES orders(id),
  quantity INTEGER NOT NULL
);
