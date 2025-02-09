import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/authController';
import { protect } from '../middleware/protected';
import { userValidator } from '../middleware/validators/user-validator';

import { validationHandler } from '../middleware/validation-handler';

export const authRouter = express.Router();
authRouter.get('/', protect, getUser);
authRouter.post('/', validationHandler(userValidator), register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
