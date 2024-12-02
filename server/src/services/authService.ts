import { Types, HydratedDocument } from 'mongoose';
import { UserModal, TUserDoument, TUser } from '../models';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export async function registerUser(user: TUser): Promise<null | TUserDoument> {
  const newUser: TUserDoument = await UserModal.create(user);
  return newUser ? newUser : null;
}

export async function findUserByUsername(
  username: string
): Promise<null | TUserDoument> {
  const user = await UserModal.findOne({ username });
  return user ? user : null;
}

export async function findUserByUserId(
  id: string
): Promise<null | TUserDoument> {
  const user = await UserModal.findById(id).select('-password');
  return user ? user : null;
}

export function generateToken(
  res: Response,
  user_id: Types.ObjectId | undefined | null
): void {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: parseInt(process.env.TOKEN_EXPIRES_IN!),
  });
}

//  maxAge should be in env variables in milliseconds
