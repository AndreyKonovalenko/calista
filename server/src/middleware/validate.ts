import { StatusCodes } from "http-status-codes"
import { CustomError } from "../utils/CustomError"
import { Request, Response, NextFunction } from "express"

import Joi from "joi"
import { IUser } from "../models/UserModel"

export type TValidator<T> = (shema: T) => Joi.ValidationResult<T>

export const validate = (validator: TValidator<IUser>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = validator(req.body)
    console.log('error', error)
    if(error) {
        next(new CustomError(error.details[0].message, StatusCodes.BAD_REQUEST))
    }
    next()
  }
}