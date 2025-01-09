
import { ErrorRequestHandler } from "express";
import { getReasonPhrase } from "http-status-codes";
const ErrorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode 
  const errMsg = getReasonPhrase(errStatus) || 'Something went wrong';
   res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

export default ErrorHandler



