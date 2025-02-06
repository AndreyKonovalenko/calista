import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { Request, Response, NextFunction } from 'express';

import Joi from 'joi';
import { IUser } from '../models/UserModel';

export interface IValidator<T> {
  (schema: T): Joi.ValidationResult<T>;
}

export const validationHandler = (validator: IValidator<IUser>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    console.log('error', error);
    if (error) {
      next(new CustomError(error.details[0].message, StatusCodes.BAD_REQUEST));
    }
    next();
  };
};
