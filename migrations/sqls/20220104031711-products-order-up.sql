CREATE TABLE products_order(
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  product_id BIGINT NOT NULL REFERENCES enchanted_stuff(id),
  order_id BIGINT NOT NULL REFERENCES orders(id)
);
