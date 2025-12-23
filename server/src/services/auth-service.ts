import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserModel, IUser } from '../models/UserModel';
import { CustomError } from '../utils/CustomError';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../utils/send-email';

export async function registerServcie(
  data: IUser,
): Promise<{ _id: Types.ObjectId; username: string }> {
   const { username } = data;
  // const userExists = await UserModel.findOne({ username }).exec();
  // if (userExists) {
  //   throw new CustomError(
  //     `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
  //     StatusCodes.CONFLICT,
  //   );
  // }
  // const newUser = await UserModel.create(data);
  // if (!newUser) {
  //   throw new CustomError(
  //     `${ReasonPhrases.INTERNAL_SERVER_ERROR}: User ${username} was not created`,
  //     StatusCodes.INTERNAL_SERVER_ERROR,
  //   );
  // }
  // const vToken = generateVerificationTorken(newUser._id, newUser.email);
  // const verificationLink = `http://localhost:${config.app.port}api/auth/verify-email?token=${vToken}`;
  const verificationLink = {username}
  sendEmail({
    subject: 'Verify Your Emali',
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });

  // return { _id: newUser._id, username: newUser.username };
  return { _id: new Types.ObjectId("asdfasdfasdf"), username: 'test user' };
}

export async function loginService(
  data: IUser,
): Promise<{ _id: Types.ObjectId; username: string }> {
  const { username, password } = data;
  const user = await UserModel.findOne({ username });
  if (!user)
    throw new CustomError(
      `${ReasonPhrases.UNAUTHORIZED}: User ${username} not found`,
      StatusCodes.UNAUTHORIZED,
    );
  if (!bcrypt.compareSync(password, user.password))
    throw new CustomError(
      `${ReasonPhrases.UNAUTHORIZED}: Password is not correct`,
      StatusCodes.UNAUTHORIZED,
    );
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

export function generateVerificationTorken(
  user_id: Types.ObjectId,
  user_email: string,
) {
  return jwt.sign(
    { id: user_id, email: user_email },
    config.app.jwtSecretVerification!,
    {
      expiresIn: config.app.vTokenExpiresIn,
    },
  );
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

export async function verifyToken(token: string) {
  if (!token)
    throw new CustomError('Token is requierd', StatusCodes.BAD_REQUEST);
  return jwt.verify(
    token,
    config.app.jwtSecretVerification,
    async (err, decoded) => {
      if (err) {
        throw new CustomError(
          `Token verification failed ${err.message}`,
          StatusCodes.FORBIDDEN,
        );
      } else {
        const paylod = decoded as JwtPayload;
        const user = await UserModel.findById(paylod.id);
        if (!user)
          throw new CustomError('User not found', StatusCodes.NOT_FOUND);
        user.isVerified = true;
        await user.save();
      }
    },
  );
}

//  maxAge should be in env variables in milliseconds
