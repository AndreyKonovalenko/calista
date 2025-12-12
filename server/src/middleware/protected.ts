import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';
import { IUser, UserModel } from '../models/UserModel';
import { HydratedDocument } from 'mongoose';
import { asyncHandler } from '../utils/async-handler';
import config from '../config';

export interface CustomRequest extends Request {
  user: HydratedDocument<IUser>;
}

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.jwt;
    if (!token) {
      throw new CustomError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );
    }
    const decoded = jwt.verify(token, config.app.jwtSecret) as JwtPayload;
    if (!decoded || !decoded.exp)
      throw new CustomError('Error decoding token', StatusCodes.UNAUTHORIZED);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime)
      throw new CustomError('Token expired', StatusCodes.UNAUTHORIZED);
    const user: HydratedDocument<IUser> | null = await UserModel.findById(
      decoded.user_id,
    ).select('-password');
    if (!user)
      throw new CustomError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED,
      );
    if (user && !user.isVerified)
      throw new CustomError(
        'you have not verified your account',
        StatusCodes.FORBIDDEN,
      );
    (req as CustomRequest).user = user;
    next();
  },
);
