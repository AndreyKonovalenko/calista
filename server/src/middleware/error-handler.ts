import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log("Middleware Error Handling");
    const errStatus = Object.prototype.hasOwnProperty.call(Object, 'statusCode') ? err.statusCode : StatusCodes.BAD_REQUEST
    const errMsg = err.message || 'Something went wrong';
      res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}
export default ErrorHandler;
