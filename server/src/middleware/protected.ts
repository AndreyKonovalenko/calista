import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { IUser } from '../models';
import { HydratedDocument } from 'mongoose';
import { findUserByUserId } from '../services/authService';

import { RequestHandler } from 'express';

export interface CustomRequest extends Request {
  user: HydratedDocument<IUser>;
}

export const protect = (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const  token = req.cookies.jwt;
  try {
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user: HydratedDocument<IUser> | null = await findUserByUserId(decoded.user_id);
    if (user){
      (req as CustomRequest).user = user
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send(getErrorMessage(error));
  }
}) as RequestHandler;
