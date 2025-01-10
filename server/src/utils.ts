export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}


export class CustomError extends Error{
  statusCode: number;
  status: string;
  constructor(message: string, statusCode: number){
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
      Error.captureStackTrace(this, this.constructor);
  }
}


