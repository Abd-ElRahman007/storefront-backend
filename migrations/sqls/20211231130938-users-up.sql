CREATE TABLE
  users(
    id serial PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
