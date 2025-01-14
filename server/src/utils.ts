export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
}

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number){
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
  }
}


