import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { generateToken } from '../services/authService';
import { IUser } from '../models';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { UserModal } from '../models';
import { CustomError } from '../utils';

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

//GET: auth/users @publict for tests
// get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await UserModal.find({});
    res.status(StatusCodes.OK).json(users);
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
    const { username } = req.body;
    const userExists: HydratedDocument<IUser> | null = await UserModal.findOne({
      username,
    });
    if (userExists) {
      throw new CustomError(
        `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
        StatusCodes.CONFLICT,
      );
    }
    const user: HydratedDocument<IUser> = await UserModal.create(req.body);
    if (user) {
      const { username } = user;
      generateToken(res, user._id);
      res
        .status(StatusCodes.CREATED)
        .send(`New user ${username} successfully created`);
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
  const { username, password } = req.body;
  try {
    const user = await UserModal.findOne({ username });
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
    generateToken(res, user._id);
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
export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};
