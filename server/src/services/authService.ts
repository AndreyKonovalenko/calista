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

export async function registerService(
  formData: IUser,
): Promise<HydratedDocument<IUser> | null> {
  const { username } = formData;
  const userExists = await UserModal.findOne({ username }).exec();
  if (userExists) {
    throw new CustomError(
      `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
      StatusCodes.CONFLICT,
    );
  }
  const newUser = await UserModal.create(formData);
  if (newUser) {
    return newUser;
  }
  return null;
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
