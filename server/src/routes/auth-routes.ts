import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  verifyEmail,
  resendLink,
  changeEmail,
} from '../controllers/auth-controller';
import { protect } from '../middleware/protected';
import {
  userValidator,
  pendingEmailValidator,
} from '../middleware/validators/user-validator';
import { validationHandler } from '../middleware/validation-handler';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', validationHandler(userValidator), register);
authRouter.get('/verify-email', verifyEmail);
authRouter.post('/verify-email', resendLink);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.patch(
  '/change-email',
  validationHandler(pendingEmailValidator),
  protect,
  changeEmail,
);
