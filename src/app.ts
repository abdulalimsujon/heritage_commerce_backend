import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { productRouter } from './app/modules/product/product.route';
import { gatewayRouter } from './app/modules/paymentGateway/gateway.route';
import { userRouter } from './app/modules/user/user.route';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: true, // Allows requests from any origin
    credentials: true, // Allow cookies and credentials
  }),
);

app.use('/api/v1/products', productRouter);
app.use('/api/v1', gatewayRouter);
app.use('/api/v1/users', userRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
