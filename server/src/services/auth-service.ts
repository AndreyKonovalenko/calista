import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserModal, IUser } from '../models/UserModel';
import { CustomError } from '../utils/CustomError';
import config from '../config';
import jwt from 'jsonwebtoken';

export async function registerServcie(
  data: IUser,
): Promise<{ _id: Types.ObjectId; username: string }> {
  const { username } = data;
  const userExists = await UserModal.findOne({ username }).exec();
  if (userExists) {
    throw new CustomError(
      `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
      StatusCodes.CONFLICT,
    );
  }
  const newUser = await UserModal.create(data);
  if (!newUser) {
    throw new CustomError(
      `${ReasonPhrases.INTERNAL_SERVER_ERROR}: User ${username} was not created`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  return { _id: newUser._id, username: newUser.username };
}

export async function loginService(
  data: IUser,
): Promise<{ _id: Types.ObjectId; username: string }> {
  const { username, password } = data;
  const user = await UserModal.findOne({ username });
  if (!user) {
    throw new CustomError(
      `${ReasonPhrases.UNAUTHORIZED}: User ${username} not found`,
      StatusCodes.UNAUTHORIZED,
    );
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new CustomError(
      `${ReasonPhrases.UNAUTHORIZED}: Password is not correct`,
      StatusCodes.UNAUTHORIZED,
    );
  }
  return { _id: user._id, username: user.username };
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
