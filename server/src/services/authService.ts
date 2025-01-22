import { Types } from 'mongoose';
import { Response } from 'express';
import { JWT_SECRET, NODE_ENV, TOKEN_EXPIRES_IN } from '../config';
import jwt from 'jsonwebtoken';

// export async function registerUser(
//   user: HydratedDocument<IUser>,
// ): Promise<null | HydratedDocument<IUser>> {
//   const newUser: HydratedDocument<IUser> = await UserModal.create(user);
//   return newUser ? newUser : null;
// }

// export async function findUserByUsername(
//   username: string,
// ): Promise<null | HydratedDocument<IUser>> {
//   const user = await UserModal.findOne({ username });
//   return user;
// }

export function generateToken(
  res: Response,
  user_id: Types.ObjectId | undefined | null,
): void {
  const token = jwt.sign({ user_id }, JWT_SECRET!, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: parseInt(TOKEN_EXPIRES_IN!),
  });
}

//  maxAge should be in env variables in milliseconds
