// import needed dependencies.
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users_routes from './handlers/users';
import products_routes from './handlers/enchanted_products';
import orders_routes from './handlers/orders';
import dashboardRoute from './service/handleDashboard';

const app: express.Application = express();
const port: number = 8080;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));
users_routes(app);
products_routes(app);
orders_routes(app);
dashboardRoute(app);
app.get('/', (req: Request, res: Response): void => {
  res.json('hello world');
});
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
export default app;
