import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getErrorMessage } from '../utils';
import { registerUser, findUserByUsername } from '../services/authService';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { generateToken } from '../services/authService';
import { IUser } from '../models';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';

// GET: auth/
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
    if (user) {
     res.status(StatusCodes.OK).json({
        isAuth: true,
        username: user.username,
      });
    }
  } catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getErrorMessage(error));
  }
}

// POST: auth/
export const register = async (req: Request, res: Response):Promise<void> => {
  try {
    const { username } = req.body;
    const userExists = await findUserByUsername(username);
    if (userExists) {
      res
        .status(StatusCodes.CONFLICT)
        .send(
          `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
        );
    }
    const user: HydratedDocument<IUser> | null = await registerUser(req.body);
    if (user) {
      generateToken(res, user._id);
      res.status(StatusCodes.OK).send('Successfuly Registered!');
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getErrorMessage(error));
  }
}

// POST: auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).send(`${ReasonPhrases.UNAUTHORIZED}: User ${username} not found.`);
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      generateToken(res, user._id);
      res.status(StatusCodes.OK).json({
        isAuth: true,
        username: user.username,
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send(`${ReasonPhrases.UNAUTHORIZED}: Password is not correct`);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getErrorMessage(error));
  }
}

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
