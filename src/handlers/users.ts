import { user, UsersStore } from '../models/users';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store: UsersStore = new UsersStore();

const index = async (req: Request, res: Response): Promise<void> => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const user = await store.show((req.body.firstname as unknown) as string);
  res.json(user);
};
const create = async (req: Request, res: Response): Promise<void> => {
  const user = {
    firstname: req.body.firstname as string,
    password: req.body.password as string,
    lastname: req.body.lastname as string,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
}
const update = async (req: Request, res: Response): Promise<void> => {
  const user = {
    firstname: req.body.firstname as string,
    password: req.body.password as string,
    firstnameNew: req.body.firstnameNew as string
  };
  try {
    const newUser = await store.update(user);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
}
const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user = {
    firstname: (req.body.firstname as unknown) as string,
    password: (req.body.password as unknown) as string,
  };
  try {
    const newUser = await store.authenticate(user.firstname, user.password);
    res.json(`Authenticated`);
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  };
};
const delete_ = async (req: Request, res: Response): Promise<void> => {
  const firstname = req.body.firstname as string;
  const password = req.body.password as string;
  try {
    const user = await store.delete(firstname, password);
    res.status(200);
    res.json('deleted');
  } catch (error) {
    res.status(400);
    res.json(`${error}`);
  }
}
const verifyAuth = async (req: Request, res: Response,next:Function): Promise<void> => {
  try {
    const token = req.body.token as string;
    const result = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json(`${error}`);
  }
};
const users_routes = (app: express.Application): void => {
  app.get('/users',verifyAuth, index);
  app.get('/users/show',verifyAuth, show);
  app.post('/users/create', create)
  app.put('/users/update',verifyAuth, update);
  app.get('/users/auth',verifyAuth, authenticate);
  app.delete('/users/delete',verifyAuth, delete_);
}

export default users_routes;
