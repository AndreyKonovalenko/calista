import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  registerServcie,
  setGeneratedToken,
  loginService,
  verifyToken,
} from '../services/auth-service';
import { IUser } from '../models/UserModel';
import { CustomRequest } from '../middleware/protected';
import config from '../config';
import { asyncHandler } from '../utils/async-handler';

//GET: auth/ @private
export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { user } = req as CustomRequest;
  try {
    res.status(StatusCodes.OK).json({
      isAuth: true,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

// POST: auth/ @public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data: IUser = { ...req.body };
    const result = await registerServcie(data);
    res
      .status(StatusCodes.CREATED)
      .send(
        `Registration successful, ${result.username} successfully created. Check yor email fro verification link`,
      );
  } catch (error) {
    next(error);
  }
};

// POST: auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const data: IUser = { ...req.body };
  try {
    const result = await loginService(data);
    setGeneratedToken(res, result._id);
    res.status(StatusCodes.OK).json({
      isAuth: true,
      username: result.username,
    });
  } catch (error) {
    next(error);
  }
};

// POST: auth/logout
// clear cookies
export const logout = (_req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: config.nodeEnv !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

// GET: auth/vrify-email @public
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token as string;
  await verifyToken(token);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Email varification successjully. You can now log in' });
});

// //GET: auth/users @publict for tests
// // get all users
// export const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const users = await UserModal.find({});
//     res.status(StatusCodes.OK).json(users);
//   } catch (error) {
//     next(error);
//   }
// };
