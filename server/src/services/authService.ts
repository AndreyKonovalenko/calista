import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HydratedDocument } from 'mongoose';
import { UserModal, IUser } from '../models/UserModel';
import { CustomError } from '../utils/CustomError';
import config from '../config';
import jwt from 'jsonwebtoken';

export async function createUser(
  user: IUser,
): Promise<null | HydratedDocument<IUser>> {
  const newUser: HydratedDocument<IUser> = await UserModal.create(user);
  return newUser;
}

type TResult = {
  _id: Types.ObjectId;
  username: string;
};

export async function registerService(data: IUser): Promise<TResult | null> {
  const { username } = data;
  const userExists = await UserModal.findOne({ username }).exec();
  if (userExists) {
    throw new CustomError(
      `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
      StatusCodes.CONFLICT,
    );
  }
  const newUser = await UserModal.create(data);
  if (newUser) {
    return { _id: newUser._id, username: newUser.username };
  }
  return null;
}

export async function loginService(
  data: IUser,
): Promise<HydratedDocument<IUser>> {
  const { username, password } = data;
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
  return user;
}

export async function findUserByUsername(
  username: string,
): Promise<null | HydratedDocument<IUser>> {
  const user = await UserModal.findOne({ username }).exec();
  return user;
}

export function generateToken(
  user_id: Types.ObjectId,
  expiration: string | undefined,
): string {
  return jwt.sign({ user_id }, config.app.jwtSecret!, {
    expiresIn: expiration,
  });
}

export function setGeneratedToken(
  res: Response,
  user_id: Types.ObjectId,
): void {
  const token = generateToken(user_id, config.app.tokenExpiresIn);
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: config.nodeEnv !== 'development',
    sameSite: 'strict',
    maxAge: parseInt(config.app.tokenExpiresIn!),
  });
}

//  maxAge should be in env variables in milliseconds
