import express, { Request, Response } from 'express';
import { product, ProductsStore } from '../models/enchanted_products';
import jwt from 'jsonwebtoken';

const store: ProductsStore = new ProductsStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
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
    };
    if (await store.show(product.name)) {
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
      name: req.body.name as string
    };
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

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products/create',verifyToken, create);
  app.post('/products/show', show);
  app.delete('/products/delete', verifyToken, delete_);
};
export default products_routes;
