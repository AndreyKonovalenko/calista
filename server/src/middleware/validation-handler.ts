import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { Request, Response, NextFunction } from 'express';

import Joi, { ValidationError, ValidationResult } from 'joi';

export const validationHandler = (schema: Joi.Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated: ValidationResult = await schema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        console.error(err.details[0].type);
        next(
          new CustomError(
            err.details[0].message,
            StatusCodes.UNPROCESSABLE_ENTITY,
          ),
        );
      }
      next(err);
    }
  };
};
