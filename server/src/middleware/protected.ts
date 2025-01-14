import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils';
import { IUser } from '../models';
import { HydratedDocument, MongooseError } from 'mongoose';
import { findUserByUserId } from '../services/authService';


export interface CustomRequest extends Request {
  user: HydratedDocument<IUser>;
}

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new CustomError('Token not provided', StatusCodes.UNAUTHORIZED)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user: HydratedDocument<IUser> | null = await findUserByUserId(
      decoded.user_id,
    );
    if (user) {
      (req as CustomRequest).user = user;
      next();
    }
  } catch (error) {
    if (error instanceof MongooseError && error.name === 'CastError'){ 
      next(new CustomError(`Borad by id: ${req.params.id} not found`, StatusCodes.INTERNAL_SERVER_ERROR ))
    } else  {
      next(error) 
    }
  }
};
