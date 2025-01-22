import { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../config';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils';
const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('Middleware Error Handling');
  const errStatus =
    err instanceof CustomError ? err.statusCode : StatusCodes.BAD_REQUEST;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: NODE_ENV === 'development' || NODE_ENV === 'test' ? err.stack : {},
  });
};
export default ErrorHandler;
