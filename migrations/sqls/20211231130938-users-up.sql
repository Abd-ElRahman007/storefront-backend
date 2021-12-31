CREATE TABLE
  users(
    id serial PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(50) NOT NULL
  );
