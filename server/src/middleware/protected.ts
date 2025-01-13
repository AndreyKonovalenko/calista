import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CustomError } from '../utils';
import { IUser } from '../models';
import { HydratedDocument, MongooseError } from 'mongoose';
import { findUserByUserId } from '../services/authService';
import { RequestHandler } from 'express';

export interface CustomRequest extends Request {
  user: HydratedDocument<IUser>;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies)
    console.log(token)
    if (!token) {
      // return res
      //   .status(StatusCodes.UNAUTHORIZED)
      //   .send(ReasonPhrases.UNAUTHORIZED);
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
    // } else {
    //   return res
    //     .status(StatusCodes.UNAUTHORIZED)
    //     .send(ReasonPhrases.UNAUTHORIZED);
    // }
  } catch (error) {
    next(error)
    console.log('catched', error)
    // if (error instanceof MongooseError && error.name === 'CastError'){ 
    //   next(new CustomError(`Borad by id: ${req.params.id} not found`, StatusCodes.INTERNAL_SERVER_ERROR ))
    // } else  {
    //   next(error) 
    }
    // return res.status(StatusCodes.UNAUTHORIZED).send(getErrorMessage(error));
};
