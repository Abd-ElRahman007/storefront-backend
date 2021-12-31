// import needed dependencies.
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: express.Application = express();
const port: number = 8080;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response): void => {
  res.json('hello world');
});
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
export default app;
