import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/authController';
import { protect } from '../middleware/protected';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
