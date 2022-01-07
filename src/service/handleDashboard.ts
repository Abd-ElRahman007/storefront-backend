import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {productOrders, DashboardQueries } from "./dashboard";

const dashboard = new DashboardQueries();

const productsInOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await dashboard.productsInOrder();
    res.json(products);
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}
const usersWithOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    if (await dashboard.showOrder(req.body.order_id)) {
      res.status(409);
      throw new Error('Order already exists');
    }
    try {
      const { quantity, order_id, product_id } = req.body;
      const order = await dashboard.create({ quantity, order_id, product_id });
      res.json(order);
    } catch (error) {
      res.status(404)
      res.json(`${error}`);
    }
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}

const showOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await dashboard.showOrder(req.body.id);
    res.json(order);
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}

const indexOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await dashboard.indexOrders();
    res.json(orders);
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await dashboard.deleteOrder(req.body.id);
    res.json(order);
  } catch (error) {
    res.status(404)
    res.json(`${error}`);
  }
}


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

const dashboardRoute = (app: express.Application): void => {
  app.get('/products-in-orders', productsInOrder);
  app.get('/users-with-orders', usersWithOrders);
  app.post('/create-order', verifyToken, createOrder);
  app.post('/show-order', verifyToken, showOrders);
  app.get('/index-orders', indexOrder);
  app.delete('/delete-order', verifyToken, deleteOrder);
}
export default dashboardRoute;
