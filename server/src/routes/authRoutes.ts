import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  getUsers,
} from '../controllers/authController';
import { protect } from '../middleware/protected';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/users', getUsers);
