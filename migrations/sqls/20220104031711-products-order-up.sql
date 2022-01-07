CREATE TABLE products_order(
  id SERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES enchanted_stuff(id),
  order_id BIGINT NOT NULL REFERENCES orders(id),
  quantity INTEGER NOT NULL
);
