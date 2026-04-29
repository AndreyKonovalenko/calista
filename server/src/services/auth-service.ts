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
): Promise<{ username: string; email: string }> {
  const { username, email } = data;
  const userExists = await UserModel.findOne({ username }).exec();
  if (userExists) {
    throw new CustomError(
      `${ReasonPhrases.CONFLICT}: username: ${username} already exists`,
      StatusCodes.CONFLICT,
    );
  }

  const emailExists = await UserModel.findOne({ email }).exec();
  if (emailExists) {
    throw new CustomError(
      `${ReasonPhrases.CONFLICT}: email: ${email} already exists`,
      StatusCodes.CONFLICT,
    );
  }

  const newUser = await UserModel.create({ ...data, isVerified: false });
  if (!newUser) {
    throw new CustomError(
      `${ReasonPhrases.INTERNAL_SERVER_ERROR}: User ${username} was not created`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  const vToken = generateVerificationTorken(newUser._id, newUser.email);
  const verificationLink = `${config.app.domen}/verify-email?token=${vToken}`;
  sendEmail({
    email: email,
    subject: 'Verify Your Email',
    message: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });

  return { username: newUser.username, email: newUser.email };
}

export async function updateEmailService(
  _id: string,
  pendingEmail: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
): Promise<void> {
  const newPendingEmail = await UserModel.findByIdAndUpdate(
    new Types.ObjectId(_id),
    pendingEmail,
    {
      new: true,
    },
  );
  console.log(newPendingEmail)
  if (!newPendingEmail) {
    throw new CustomError(
      `${ReasonPhrases.INTERNAL_SERVER_ERROR}: User ${pendingEmail} was not created`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  const vToken = generateVerificationTorken(new Types.ObjectId(_id), newPendingEmail.pendingEmail);
  const verificationLink = `${config.app.domen}/verify-pending_email?token=${vToken}`;
  sendEmail({
    email: newPendingEmail.pendingEmail,
    subject: 'Verify your new email',
    message: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });
}

export async function resendVerificationLink(data: {
  email: string;
}): Promise<void> {
  const { email } = data;
  const user = await UserModel.findOne({ email }).exec();
  if (!user) {
    throw new CustomError(
      `${ReasonPhrases.UNAUTHORIZED}: User with email adress ${email} not found`,
      StatusCodes.UNAUTHORIZED,
    );
  }
  const vToken = generateVerificationTorken(user._id, user.email);
  const verificationLink = `${config.app.domen}/verify-email?token=${vToken}`;
  sendEmail({
    email: email,
    subject: 'Verify Your Emali',
    message: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });
}

export async function loginService(data: IUser): Promise<{
  _id: Types.ObjectId;
  username: string;
  email: string;
}> {
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

  if (!user.isVerified)
    throw new CustomError(
      'you have not verified your account',
      StatusCodes.FORBIDDEN,
    );
  return { _id: user._id, username: user.username, email: user.email };
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
          StatusCodes.UNAUTHORIZED,
          { emailIsVerified: false },
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

export async function verifyTokenForPendingEmail(token: string) {
  console.log(token)
  if (!token)
    throw new CustomError('Token is requierd', StatusCodes.BAD_REQUEST);
  return jwt.verify(
    token,
    config.app.jwtSecretVerification,
    async (err, decoded) => {
      if (err) {
        throw new CustomError(
          `Token verification failed ${err.message}`,
          StatusCodes.UNAUTHORIZED,
          { emailIsVerified: false },
        );
      } else {
        const paylod = decoded as JwtPayload;
        const user = await UserModel.findById(paylod.id);
        if (!user)
          throw new CustomError('User not found', StatusCodes.NOT_FOUND);
        user.email = user.pendingEmail;
        await user.save();
      }
    },
  );
}


export async function updateUserById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  await UserModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}

//  maxAge should be in env variables in milliseconds
