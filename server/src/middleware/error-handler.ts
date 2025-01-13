import { ErrorRequestHandler } from "express";
import { getReasonPhrase } from "http-status-codes";
const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

  console.log("Middleware Error Hadnling", err);
    const errStatus = err.statusCode 
    const errMsg = getReasonPhrase(errStatus) || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler;
