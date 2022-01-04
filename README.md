# Storefront Backend Project

## Getting Started

first thing is to install the project use `npm i` to install all the dependencies and then configure the `.env` file and how to use it i will walk you through it and you must install `postgreSQL` and configure it as you like

## the (.env) file setup

this file must contain the following: all uppercase like i showed

- the `POSTGRES_HOST` better be 127.0.0.1
- the `POSTGERS_DB` the main database that you will use in the project
- the `POSTGRES_DB_TEST` the test database that will be the same name as the main with a `_test` after he name
- the `POSTGRES_USER` the name of the user you are working on like `postgres` the default one
- the `POSTGRES_PASSWORD` the password for the user you want to sign in with
- the `ENV` the default is `dev` it is the environment that the project will run in there are (test and dev {default})
- the `BCRYPT_PASSWORD` the hash password that it will be used in encripting the password
- the `SALT_ROUNDS` the number of salt rounds
- the `JWT_SECRET` the token secret text

these are the variables in the `.env` file ,make the key `uppercase`
setup it like these and all the parts in the project that used it will work

## the package.json scripts

- **first** the `start` script that starts a server
- **second** the `watch` script that watch for any changes in the typescript and compiles it
- **third** the `migrate-up` script that run the migrate up in the main database
- **fourth** the `migrate-down` script that run the migrate down in the main database
- **fifth** the `test` script that run the test jasmine
- **sixth** the `lint` script that run the linter along with prettier

if you want to use them just run `npm run {script name}` and thats it

## setup the project

- **first** setup the database by creating the main database in psql create a user `CREATE USER store_user WITH PASSWORD 'postgres' CREATEDB;` that will create the user with password second in terminal run `psql -U store_user` and enter the password `postgres` now when you get in create the databases the first one is the main `CREATE DATABASE store_backend;` and then create the test database `CREATE DATABASE store_backend_test;` this will create the databases and the user to it
- **second** you fill the mentioned `.env` file with the used user and database and user password and database test like

```text
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = store_backend
POSTGRES_DB_TEST = store_backend_test
POSTGRES_USER = store_user
POSTGRES_PASSWORD = postgres
ENV=dev
BCRYPT_PASSWORD=bcryptpassword
SALT_ROUNDS=10
JWT_SECRET=jwtsecret
```

- **third** npm i to install all the dependencies
- **fourth** run the server by using `npm run start` the postgers port is 5432 and the local host port is 8080
- **fifth** you can use postman or any alter to use the endpoints
