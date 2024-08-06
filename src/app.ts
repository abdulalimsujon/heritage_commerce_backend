import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { productRouter } from './modules/product/product.route';
import { gatewayRouter } from './modules/paymentGateway/gateway.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', productRouter);
app.use('/api/v1', gatewayRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
