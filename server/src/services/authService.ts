import { Types } from 'mongoose';
import { Response } from 'express';
import config from '../config';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModal, IUser } from '../models/UserModel';


export async function createUser(
  user: IUser,
): Promise<null | HydratedDocument<IUser>> {
  const newUser: HydratedDocument<IUser> = await UserModal.create(user);
  return newUser;
}

export async function findUserByUsername(
  username: string,
): Promise<null | HydratedDocument<IUser>> {
  const user = await UserModal.findOne({username}).exec();
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
