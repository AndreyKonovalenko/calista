export class CustomError extends Error {
  statusCode: number;
  options?: { [key: string]: boolean };
  constructor(
    message: string,
    statusCode: number,
    options?: { [key: string]: boolean },
  ) {
    super(message);
    this.statusCode = statusCode;
    this.options = options;
    Error.captureStackTrace(this, this.constructor);
  }
}
