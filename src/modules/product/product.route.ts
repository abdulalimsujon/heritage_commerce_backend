import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.get('/getAllProduct', productController.getAllProductFromDb);
router.get('/getSingleProduct/:id', productController.getSingleProduct);

export const productRouter = router;
