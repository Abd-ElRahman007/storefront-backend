import express, { Request, Response } from 'express';
import { DashboardQueries } from "./dashboard";

const dashboard = new DashboardQueries();

const productsInOrder = async (req: Request, res: Response): Promise<void> => {
  const products = await dashboard.productsInOrder();
  res.json(products);
}
const usersWithOrders = async (req: Request, res: Response): Promise<void> => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
}
const dashboardRoute = (app: express.Application): void => {
  app.get('/products-in-orders', productsInOrder);
  app.get('/users-with-orders', usersWithOrders);
}
export default dashboardRoute;
