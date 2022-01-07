import { order, OrdersStore } from '../models/orders';
import { user, UsersStore } from '../models/users';
import { product, ProductsStore } from '../models/enchanted_products';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store: OrdersStore = new OrdersStore();
const users_store: UsersStore = new UsersStore();
const products_store: ProductsStore = new ProductsStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.show((req.params.id_user as unknown) as number);
    res.json(order);
  } catch (error) {
    res.status(200);
    res.json(`${error}`);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = {
      id_user: (req.params.id as unknown) as number,
      status: req.body.status as string
    };
    if (!await users_store.showId(order.id_user)) {
      res.status(401);
      throw new Error('User not found');
    }
    if (!await products_store.showId(order.id_user)) {
      res.status(401);
      throw new Error('Product not found');
    }
    if (await store.show(order.id_user)) {
      res.status(401);
      throw new Error('Order already exists');
    }
    try {
      const newOrder = await store.create(order);
      res.json(newOrder);
    } catch (error) {
      res.status(400);
      res.json(`${error}`);
    }
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
};
const delete_ = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = {
      id_user: (req.params.id_user as unknown) as number
    };
    try {
      const item = await store.delete(order.id_user);
      res.status(200);
      res.json(`Deleted`);
    } catch (error) {
      res.status(400);
      res.json(`${error}`);
    }
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
};
const verifyToken = (req: Request, res: Response, next: any): void => {
  try {
    const auth = req.headers.authorization as string;
    const token = auth.split(' ')[1];
    const result = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
}

const orders_routes = (app: express.Application): void => {
  app.get('/orders', index);
  app.post('/orders/create/:id',verifyToken, create);
  app.post('/orders/show/:id_user',verifyToken, show);
  app.delete('/orders/delete/:id_user', delete_);
}
export default orders_routes;
