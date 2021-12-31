CREATE TABLE
  enchanted_orders(
    id serial PRIMARY KEY,
    quantity INTEGER NOT NULL,
    enchanted_stuff_id INTEGER NOT NULL REFERENCES enchanted_stuff(id),
    order_id INTEGER NOT NULL REFERENCES orders(id)
  );
