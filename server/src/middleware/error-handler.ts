import { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../config';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { TokenExpiredError } from 'jsonwebtoken';
const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('Middleware Error Handling');
  let errStatus = StatusCodes.BAD_REQUEST;
  if (err instanceof CustomError) {
    errStatus = err.statusCode;
  }
  if (err instanceof TokenExpiredError) {
    errStatus = StatusCodes.UNAUTHORIZED;
  }
  const errMsg = err.message || 'Something went wrong';
  if (NODE_ENV === 'test') {
    console.log(err);
  }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: NODE_ENV === 'development' || NODE_ENV === 'test' ? err.stack : {},
  });
};
export default ErrorHandler;
