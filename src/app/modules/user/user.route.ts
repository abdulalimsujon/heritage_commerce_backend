/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { upload } from '../../utilities/SendImageToCloudinary';
import validataRequest from '../../middleware/validateSchemaRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router();

// const errorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// };

router.post(
  '/create-user',
  upload.single('image'),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      next(error); // Pass the error to the error handler if parsing fails
    }
  },
  // validataRequest(userValidationSchema),
  userController.createUser,
);

router.patch(
  '/update-user/:id',
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse req.body.data if it exists and is a string
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      next();
    } catch (error) {
      next(error); // Pass the error to the error handler if parsing fails
    }
  },
  userController.updateUser,
);
router.get('/', userController.getAlluser);
router.delete('/delete-user/:id', userController.deleteUserIntoDb);
router.post('/login', userController.loginUser);

export const userRouter = router;
