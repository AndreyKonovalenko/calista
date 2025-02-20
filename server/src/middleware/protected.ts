import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { IUser, UserModel } from '../models/UserModel';
import { HydratedDocument } from 'mongoose';
import config from '../config';

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
      throw new CustomError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );
    }
    const decoded = jwt.verify(token, config.app.jwtSecret) as JwtPayload;
    const user: HydratedDocument<IUser> | null = await UserModel.findById(
      decoded.user_id,
    ).select('-password');
    if (user) {
      (req as CustomRequest).user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};
