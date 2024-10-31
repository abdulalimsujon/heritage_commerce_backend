import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { Express } from 'express';
import { userServices } from './user.service';
import httpStatus from 'http-status';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const reqBody = req.body;

  console.log(reqBody);
  const file = req.file;
  console.log(file);

  const result = await userServices.createUserIntoDb(
    reqBody,
    file as Express.Multer.File,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All product retrived  successfully',
    data: result,
  });
});

const getAlluser = catchAsync(async (req, res) => {
  const result = await userServices.getAlluserFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All users retrived  successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const file = req.file;
  const reqbody = req.body;
  const result = await userServices.updateUserIntoDb(
    reqbody,
    file as Express.Multer.File,
    id,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is updated Successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const reqbody = req.body;
  console.log(reqbody);
  const result = await userServices.loginUser(reqbody);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All users retrived  successfully',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

export const userController = {
  createUser,
  getAlluser,
  updateUser,
  loginUser,
};
