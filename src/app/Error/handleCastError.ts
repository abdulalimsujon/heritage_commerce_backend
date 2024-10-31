import mongoose from 'mongoose';
import {
  TErrorSources,
  TgenericRerrorResponse,
} from '../interface/TerrorResources';

const handleCastError = (
  error: mongoose.Error.CastError,
): TgenericRerrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error?.path,
      message: error.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleCastError;
