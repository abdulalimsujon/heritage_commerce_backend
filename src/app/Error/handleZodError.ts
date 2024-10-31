import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSources,
  TgenericRerrorResponse,
} from '../interface/TerrorResources';

const handleZodError = (err: ZodError): TgenericRerrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleZodError;
