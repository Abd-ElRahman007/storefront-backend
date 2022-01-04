# API Requirements

first of careful when you create the user becouse the returning jwt you will copy and paste it in the required endpoint like i mentioned in the endpoint description and needs
also there are two types of test one i disabled becouse it tests with a token you will have to supply to work so you can supply to each (usersSpec, enchanted_stuffSpec and ordersSpec) you will see a comment that till you were to put the token to make a complete request to the api that actually tests all the endpoints and the other test are that will return there condition is to return false because there is no token supplied so they will succeed

## API Endpoints

the server is running on <http://localhost:8080> to use any route just put it after the localhost link for ex <http://localhost:8080/users> that would take you the the users index to see all the users in the database {token required} in the body

## whats inside it the schema

i have created three migrations for each table the (orders,users, and enchanted_stuff {product table})

### 1. the order table

inside of the order migration up i have created the table orders with the schema

- `id` the id of the order
- `id_product` the id of the product that it is being ordered that is referenced the id of the (enchanted_stuff)table
- `quantity` the quantity of the product that it is being ordered
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

## Products

when you use that endpoint in create you must supply the required body variable like:

```json
{
  "name":"example",
  "price":4,
  "token":"{the token you get from the users create}"
}
```

the show endpoint will be like:

```json
{
  "name":"example"
}
```

the delete endpoint will be like:

```json
{
  "name":"example",
  "token":"{token}"
}
```

## the product route (enchanted_stuff)

there are 4 routes for enchanted_stuff which are:

- `/products` it is a [GET] request route that gives you all products out there {token not required}
- `/products/show` it is a [GET] request route that shows you that specific product just supply in the body the name of the product {token not required}
- `/products/create` it is a [POST] request route that creates a product it needs a name,price and token to create the product that you put in the body of the request it needs a token
- `/products/delete` it is a [DELETE] request route that deletes a product it needs the token and the name of the product the token is required

the token is the same as the users token you get in the create users route

## Users

when you use this endpoint in create the body will be like that:

```json
{
  "firstname":"jack",
  "lastname":"smith",
  "password":"password"
}
```

the show will be like this:

```json
{
  "firstname":"jack",
  "token":"{token}"
}
```

the update method will be like this:

```json
{
  "firstname":"jack",
  "password":"password",
  "firstnameNew":"sparrow",
  "token":"{token}"
}
```

the auth method look like this:

```json
{
  "firstname":"jack",
  "password":"password",
  "token":"{token}"
}
```

the delete method will be like this:

```json
{
  "firstname":"jack",
  "password":"password",
  "token":"{token}"
}
```

## users route

there are 6 routes for user which are:

- `/users` it is a [GET] request route that gets you all users in the users database it needs a token in the body
- `/users/show` it is a [GET] request route that gets you the user with that specific firstname that you can supply in the body and it needs a token
- `/users/create` it is a [POST] request route that creates a user with that firstname,lastname, and password that you can supply it in the body
- `/users/update` it is a [PUT] request route that alter an user to change its firstname you will supply it with the firstname and password and the {firstnameNew} and a token to change it
- `/users/auth` it is a [GET] request route that authenticate a user give it in the body the firstname and the password of that user and a token
- `/users/delete` it is a [DELETE] request route that deletes a user it requires the firstname and password and a token that you supply to it in the body

### Orders

the order endpoint create will be like this with just a slightly different you must make sure that the (user_id and the product_id) it exist the (id_user) is supplied in the parameter

```json
{
  "id_product":{the id of that product} number,
  "quantity":3,
  "status":"active",
  "token":"{token}"
}
```

the show method will be like this:

```json
{
  "id_product":{the id of that product} number
}
```

### the orders route

there are 4 routes for orders which are:

- `/order` it is a [GET] request route that gives you the all the orders for that exists {token not required}
- `/order/show` it is a [GET] request route that shows you a specific order you give it the id_product in the body to see the orders {token not required}
- `/order/create/:id` it is a [POST] request route that creates an order for that user you supply it with (id_product,quantity,status, and token) the user id you supply with the parameter (:id) that is in the route token is required
- `/order/delete   it is a [DELETE] request route that deletes an order you give it the id_product in the body along with the token

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
- id_product is an integer references enchanted_stuff(id)
- quantity is an integer not null
- id_user is an integer reference users(id)
- status is a varchar(10)
