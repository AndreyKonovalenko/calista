import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/authController';
import { protect } from '../middleware/protected';
import { validateUser } from '../models/UserModel';
import { validationHandler } from '../middleware/validation-handler';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', validationHandler(validateUser), register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
