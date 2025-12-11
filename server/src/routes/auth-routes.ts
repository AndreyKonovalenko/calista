import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  verifyEmail,
} from '../controllers/auth-controller';
import { protect } from '../middleware/protected';
import { userValidator } from '../middleware/validators/user-validator';
import { validationHandler } from '../middleware/validation-handler';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', validationHandler(userValidator), register);
authRouter.get('/verify-email', verifyEmail);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
