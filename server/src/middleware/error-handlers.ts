import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../config';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { TokenExpiredError } from 'jsonwebtoken';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new CustomError(
    `path ${req.originalUrl} not found`,
    StatusCodes.NOT_FOUND,
  );
  next(error);
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  console.log('Middleware Error Handling');
  let errStatus = StatusCodes.BAD_REQUEST;
  if (err instanceof CustomError) {
    errStatus = err.statusCode;
  }
  if (err instanceof TokenExpiredError) {
    errStatus = StatusCodes.UNAUTHORIZED;
  }
  const errMsg = err.message || 'Something went wrong';
  if (config.nodeEnv === 'test' || config.nodeEnv === 'development') {
    console.log(err);
  }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack:
      config.nodeEnv === 'development' || config.nodeEnv === 'test'
        ? err.stack
        : {},
  });
};
