import { sendImageToCloudinary } from '../../utilities/SendImageToCloudinary';
import { Tuser } from './user.interface';
import { Express } from 'express';
import { User } from './user.model';
import config from '../../config';
import { createToken } from './createToken';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';

const createUserIntoDb = async (
  user: Tuser,
  file: Express.Multer.File & { path?: string },
) => {
  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    user.image = secure_url as string;
  }
  if (!file) {
    user.image = 'no image provided';
  }

  const result = await User.create(user);

  return result;
};
export type TLoginUser = {
  email: string;
  password: string;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.find({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  console.log(user);
  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobile,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const updateUserIntoDb = async (
  user: Partial<Tuser>,
  file: Express.Multer.File & { path?: string },
  id: string,
) => {
  if (file) {
    const imageName = `${Math.floor(100 + Math.random() * 900)}`;
    const path = file?.path;
    const { secure_url } = (await sendImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    user.image = secure_url as string;
  }
  if (!file) {
    return;
  }

  const result = await User.findByIdAndUpdate(id, user);
  return result;
};

const getAlluserFromDb = async () => {
  const result = await User.find({});
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAlluserFromDb,
  updateUserIntoDb,
  loginUser,
};
