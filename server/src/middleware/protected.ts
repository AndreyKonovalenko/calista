import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { IUser, UserModal } from '../models/UserModel';
import { HydratedDocument } from 'mongoose';
import { JWT_SECRET } from '../config';

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
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const user: HydratedDocument<IUser> | null = await UserModal.findById(
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
