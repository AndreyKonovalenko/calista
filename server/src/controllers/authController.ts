import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  findUserByUsername,
  setGeneratedToken,
  createUser,
} from '../services/authService';
import { IUser } from '../models/UserModel';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { CustomError } from '../utils/CustomError';
import config from '../config';
import { registerService } from '../services/authService';

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

// POST: auth/ @public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const formData: IUser = { ...req.body };
    const newUser = await registerService(formData);
    if (newUser) {
      setGeneratedToken(res, newUser._id);
      res
        .status(StatusCodes.CREATED)
        .send(`New user ${newUser.username} successfully created`);
    }
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
  const userDTO = { ...req.body };
  // data transfer object
  const { username, password } = userDTO;
  // const isValid = validator.user(userDTO)
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new CustomError(
        `${ReasonPhrases.UNAUTHORIZED}: User ${username} not found.`,
        StatusCodes.UNAUTHORIZED,
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError(
        `${ReasonPhrases.UNAUTHORIZED}: Password is not correct.`,
        StatusCodes.UNAUTHORIZED,
      );
    }
    setGeneratedToken(res, user._id);
    res.status(StatusCodes.OK).json({
      isAuth: true,
      username: user.username,
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
