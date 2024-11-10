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
    next();
  },
  productController.createProduct,
);

router.get('/getSingleProduct/:id', productController.getSingleProduct);

router.get('/get-products', productController.getAllProductFromDb);

router.delete('/delete-product/:id', productController.deleteProduct);

router.patch(
  '/update-product/:id',
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse req.body.data if it exists and is a string
      console.log('this is file', req.file);
      next();
    } catch (error) {
      next(error); // Pass the error to the error handler if parsing fails
    }
  },
  productController.updateProduct,
);
router.get('/latest-products', productController.getLastestProducts);

router.delete(
  '/update-cart-product',
  productController.deleteProductAfterOrder,
);

router.use(errorHandler);

export const productRouter = router;
