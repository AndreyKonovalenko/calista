import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  registerServcie,
  setGeneratedToken,
  loginService,
  verifyToken,
  updateEmailService,
  verifyTokenForPendingEmail,
} from '../services/auth-service';
import { IUser } from '../models/UserModel';
import { CustomRequest } from '../middleware/protected';
import config from '../config';
import { asyncHandler } from '../utils/async-handler';
import { resendVerificationLink } from '../services/auth-service';

//GET: auth/ @private
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  res.status(StatusCodes.OK).json({
    _id: user._id,
    isAuth: true,
    username: user.username,
    email: user.email,
    pendignEmail: user.pendingEmail,
  });
});

// POST: auth/ @public
export const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const data: IUser = { ...req.body };
    const result = await registerServcie(data);
    res.status(StatusCodes.OK).json({
      message: `Registration successful, ${result.username} successfully created. Check yor email ${result.email} for verification link`,
      userCreated: true,
    });
  },
);

// POST: auth/login
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const data: IUser = { ...req.body };
    const result = await loginService(data);
    setGeneratedToken(res, result._id);
    res.status(StatusCodes.OK).json({
      _id: result._id,
      isAuth: true,
      username: result.username,
      email: result.email,
    });
  },
);

// POST: auth/logout
// clear cookies
export const logout = (_req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: config.nodeEnv !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

// GET: auth/verify-email @public
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token as string;
  await verifyToken(token);
  res.status(StatusCodes.OK).json({
    message: 'Verification successful. You can now log in',
    emailVerified: true,
  });
});

//GET auth/verify-pending_email @public
export const verifyPendingEmail = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token as string;
  await verifyTokenForPendingEmail(token);
  res.status(StatusCodes.OK).json({
    message: 'Email changed successfully',
    emailVerified: true,
  });
});


// POST: auth/verify-email @public
export const resendLink = asyncHandler(async (req: Request, res: Response) => {
  const data: { email: string } = { ...req.body };
  await resendVerificationLink(data);
  res.status(StatusCodes.OK).json({
    message: 'Email confirmation link has been sent',
  });
});

// PATCH: auth/change-email @private
export const changeEmail = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  const pendingEmail = { ...req.body };
  await updateEmailService(user._id.toString(), pendingEmail);
  res.status(StatusCodes.OK).json({
    message:'Check your new email inbox (including spam/junk folders) for a message with a verification link.', 
    pendingEmail:true
  });
});

// POST: auth/forget-password
// POST: auth/reset-possword
