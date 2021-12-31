import { user, UsersStore } from '../models/users';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store: UsersStore = new UsersStore();

const show = async (req: Request, res: Response): Promise<void> => {
  const user = await store.show((req.body.username as unknown) as string);
  res.json(user);
};
const create = async (req: Request, res: Response): Promise<void> => {
  const user = {
    username: req.body.username as string,
    password: req.body.password as string,
    email: req.body.email as string,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error as string + user);
  }
}
const update = async (req: Request, res: Response): Promise<void> => {
  const user = {
    username: req.body.username as string,
    password: req.body.password as string
  };
  const userNew = {
    username: req.body.usernameNew as string
  };
  try {
    const newUser = await store.update(user, userNew);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error as string + user);
  }
}
const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user = {
    username: (req.body.username as unknown) as string,
    password: (req.body.password as unknown) as string
  };
  try {
    const newUser = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error as string + user);
  };
};
const delete_ = async (req: Request, res: Response): Promise<void> => {
  const username = req.body.username as string;
  try {
    const user = await store.delete(username);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error as string + username);
  }
}
const users_routes = (app: express.Application): void => {
  app.get('/users/show', show);
  app.post('/users/create', create)
  app.post('/users/update', update);
  app.get('/users/auth', authenticate);
  app.delete('/users/delete', delete_);
}

export default users_routes;
