import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
  },
) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
