import express, { Request, Response } from 'express';
import { product, ProductsStore } from '../models/enchanted_products';
import jwt from 'jsonwebtoken';

const store: ProductsStore = new ProductsStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show((req.body.name as unknown) as string);
    res.json(product);
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = {
    name: req.body.name as string,
    price: req.body.price as number,
      token: req.body.token as string
    };
    if (product.token) {
      var decoded = jwt.verify(product.token, process.env.JWT_SECRET as string);
    } else {
      res.status(401);
      throw new Error('No token');
    } if (await store.show(product.name)) {
      res.status(409);
      throw new Error('Product already exists');
    }
    try {
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (error) {
      res.status(400);
      res.json(`${error}`);
    }
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
}
const delete_ = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = {
      name: req.body.name as string,
      token: req.body.token as string
    };
    if (product.token) {
      var decoded = jwt.verify(product.token, process.env.JWT_SECRET as string);
    } else {
      res.status(401);
      throw new Error('No token');
    }
    try {
      const item = await store.delete(product.name);
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
}

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products/create', create);
  app.get('/products/show', show);
  app.delete('/products/delete', delete_);
};
export default products_routes;
