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

// Define the TLoginUser type
type TLoginUser = {
  email: string;
  password: string;
};

const loginUser = async (payload: TLoginUser) => {
  // Check if the user exists by their email
  const user = await User.findOne({
    email: payload.email,
    password: payload.password,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Prepare the payload for JWT creation
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    status: user.status,
  };

  // Create access and refresh tokens
  const accessToken = createToken(
    jwtPayload as Tuser,
    config.jwt_access_token as string,
    config.jwt_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload as Tuser,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    jwtPayload,
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

  const result = await User.findByIdAndUpdate(id, user);
  return result;
};

const getAlluserFromDb = async () => {
  const result = await User.find({});
  return result;
};

const deleteUserIntoDb = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAlluserFromDb,
  updateUserIntoDb,
  deleteUserIntoDb,
  loginUser,
};
