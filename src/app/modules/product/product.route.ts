/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { productController } from './product.controller';
import { upload } from '../../utilities/SendImageToCloudinary';

const router = express.Router();

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //console.error(err.stack);
  res.status(500).send('Something went wrong!!!');
};

router.get('/getAllProduct', productController.getAllProductFromDb);

router.post(
  '/create-product',
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log('ff', req.body);
    console.log(req.file);
    next();
  },
  productController.createProduct,
);

router.get('/getSingleProduct/:id', productController.getSingleProduct);

router.get('/get-products', productController.getAllProductFromDb);
router.get('/all-product', productController.getProducts);

router.delete('/delete-product/:id', productController.deleteProduct);

router.patch('/update-product/:id', productController.updateProduct);
router.get('/latest-products', productController.getLastestProducts);

router.delete(
  '/update-cart-product',
  productController.deleteProductAfterOrder,
);

router.use(errorHandler);

export const productRouter = router;
