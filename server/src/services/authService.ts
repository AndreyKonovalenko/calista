import { Types } from 'mongoose';
import { Response } from 'express';
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
