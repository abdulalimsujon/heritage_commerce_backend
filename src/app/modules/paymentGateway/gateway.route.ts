import express from 'express';
import { gatewayController } from './gateway.controller';
const router = express.Router();

router.post('/create-checkout-session', gatewayController.createGateway);
export const gatewayRouter = router;
