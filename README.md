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

## setup the project

- first you fill the mentioned `.env` file with the used user and database
- second npm i to install all the dependencies
- third run the server by using `npm run start`
- fourth you an postman or any alter to use the endpoints
