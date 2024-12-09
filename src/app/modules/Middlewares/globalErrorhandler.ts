/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../Interface/Error';
import config from '../../config';
import { handleZodError } from '../Errors/HandleZodError';
import { handleValidationError } from '../Errors/HandleValidationError';
import { handleCastError } from '../Errors/HandleCastError';
import { handleDuplicateError } from '../Errors/HandleDuplicateError';
import AppError from '../Errors/AppErrors';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error details
  let statusCode = 500;
  let message = err?.message ||'Something went wrong 1!';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: err?.message || 'Something went wrong 2! ',
    },
  ];

  // Zod Error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // Validation Error (e.g., Mongoose validation)
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // Cast Error (e.g., ObjectId invalid)
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // Duplicate Key Error (MongoDB)
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  // App error 
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } 
  //  throw error 
  else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  // Final Error Response
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      name: err?.name || 'Error',
      message: err?.message || 'Unknown error',
      stack: config.NODE_ENV === 'developments' ? err?.stack : null,
    },
    errorSources,
  });
};

export default globalErrorHandler;
