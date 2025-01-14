import { ErrorRequestHandler } from "express";
const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log("Middleware Error Hadnling");
    const {statusCode } = err;
    const errStatus = statusCode ? statusCode : 400
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler;
