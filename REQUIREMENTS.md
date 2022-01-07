# API Requirements

first of careful when you create the user because the returning jwt you will copy and paste it in the required endpoint like i mentioned in the endpoint description, you then supply it in the header and i write the syntax corresponding to each endpoint that needs it

## API Endpoints

the server is running on <http://localhost:8080> to use any route just put it after the localhost link for ex <http://localhost:8080/users> that would take you the the users index to see all the users in the database {token required} in the body

## whats inside it the schema

i have created four migrations for each table the (orders,users, and enchanted_stuff {product table},and products_order )

### 1. the order table

inside of the order migration up i have created the table orders with the schema

- `id` the id of the order
- `id_user` the user that ordered that is referenced the id of the (users) table
- `status` the status of the order if it active, pending, or delivered

these are the component of the order table

### 2. the users table

inside of the users migration up i have created the table users with the schema

- `id` the user's id and it is a serial primary key
- `firstname` the firstname of the user
- `lastname` the lastname of the user
- `password` the password for that user

these are the component of the users table

### 3. the enchanted_stuff table

inside of the enchanted_stuff migration up i have created the table enchanted_stuff with the schema

- `id` the id of the product
- `name` the name of the product
- `price` the price of the product

these are the component of the enchanted_stuff table

### 4. the products_order table

inside of the products_order migration up i gave created a table products_order with the schema

- `id` the id of the product order
- `product_id` that reference the enchanted_stuff id
- `order_id` that reference the order id
- `quantity` the quantity of the product that it is being ordered

these are the component of the products_order table

## Products

when you use that endpoint in create you must supply the required body variable like:

```json
{
  "name": "example",
  "price": 4
}
```

the show endpoint will be like:

```json
{
  "name": "example"
}
```

the delete endpoint will be like:

```json
{
  "name": "example"
}
```

## the product route (enchanted_stuff)

there are 4 routes for enchanted_stuff which are:

- `/products` it is a [GET] request route that gives you all products out there {token not required}
- `/products/show` it is a [GET] request route that shows you that specific product just supply in the body the name of the product {token not required}
- `/products/create` it is a [POST] request route that creates a product it needs a name,price and token to create the product that you put in the body of the request it needs a token and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/products/delete` it is a [DELETE] request route that deletes a product it needs the token and the name of the product the token is required and token is in the header by a syntax `Authorization: Bearer {token}` in the header

the token is the same as the users token you get in the create users route

## Users

when you use this endpoint in create the body will be like that:

```json
{
  "firstname": "jack",
  "lastname": "smith",
  "password": "password"
}
```

the show will be like this:

```json
{
  "firstname": "jack"
}
```

the update method will be like this:

```json
{
  "firstname": "jack",
  "password": "password",
  "firstnameNew": "sparrow"
}
```

the auth method look like this:

```json
{
  "firstname": "jack",
  "password": "password"
}
```

the delete method will be like this:

```json
{
  "firstname": "jack",
  "password": "password"
}
```

## users route

there are 6 routes for user which are:

- `/users` it is a [GET] request route that gets you all users in the users database and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/users/show` it is a [POST] request route that gets you the user with that specific firstname that you can supply in the body and it needs a token and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/users/create` it is a [POST] request route that creates a user with that firstname,lastname, and password that you can supply it in the body
- `/users/update` it is a [PUT] request route that alter an user to change its firstname you will supply it with the firstname and password and the {firstnameNew} and a token to change it and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/users/auth` it is a [POST] request route that authenticate a user give it in the body the firstname and the password of that user and a token and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/users/delete` it is a [DELETE] request route that deletes a user it requires the firstname and password and a token that you supply to it in the body and token is in the header by a syntax `Authorization: Bearer {token}` in the header

### Orders

the order endpoint create will be like this with just a slightly different you must make sure that the (user_id) is exist and the (id_user) is supplied in the parameter

```json
{
  "status":"active"
}
```

the show method will supply in the params like
 be like this:

```text
http://localhost:8080/orders/show/{user_id}
```

### the orders route

there are 4 routes for orders which are:

- `/order` it is a [GET] request route that gives you the all the orders for that exists {token not required}
- `/order/show/:id-user` it is a [POST] request route that shows you a specific order you give it the id_user in the params to see the orders {token not required}
- `/order/create/:id` it is a [POST] request route that creates an order for that user you supply it with (status and token) the user id you supply with the parameter (:id) that is in the route token is required and token is in the header by a syntax `Authorization: Bearer {token}` in the header
- `/order/delete:id_user` it is a [DELETE] request route that deletes an order you give it the id_user in the param along with the token and token is in the header by a syntax `Authorization: Bearer {token}` in the header

### the products_order route

there are two routes for products_order which are:

- `/products-in-orders` it is a [GET] request route that joins the products and orders table to show how many orders with that product
- `/users-with-orders` it is a [GET] request route that joins the users and order table to show how many orders does the user order
- `/create-order` it is a [POST] request route that creates an order with (product_id,order_id,quantity) that you supply in the body and a token that is exist in the header by a syntax `Authorization: Bearer {token}` in the header
- `/show-order` it is a [POST] request route that shows you the order for that exact order id you supply the route with the id and a token in the header by a syntax `Authorization: Bearer {token}` in the header
- `/index-order` it is a [GET] request route that shows all the orders {token not required}
- `/delete-order` it is a [DELETE] request route that deletes an order in the Products_order it needs the id of the order in the body and a token that is there by a syntax `Authorization: Bearer {token}` in the header

## Data Shapes

the data types are the following

### Product type

- id is a serial primary key
- name is a varchar(66) not null
- price is an integer not null

### User type

- id serial primary key
- firstname varchar(20) not null
- lastname varchar(25) not null
- password varchar(255) not null

### Orders type

- id is a serial primary key
- id_user is an integer reference users(id)
- status is a varchar(10)

### products_orders type

- id is a SERIAL PRIMARY KEY
- product_id is a BIGINT NOT NULL REFERENCES enchanted_stuff(id)
- order_id is a BIGINT NOT NULL REFERENCES orders(id)
- quantity INTERGER NOT NULL
