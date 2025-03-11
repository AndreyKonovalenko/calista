import express from 'express';
import {
  getBoards,
  addBoard,
  deleteBoard,
  getBoard,
  upatedBoard,
} from '../controllers/boards-controller';
import { protect } from '../middleware/protected';
import { validationHandler } from '../middleware/validation-handler';
import { boardValidator } from '../middleware/validators/baord-validator';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', validationHandler(boardValidator), protect, addBoard);
boardsRouter.get('/:id', protect, getBoard);
boardsRouter.put(
  '/:id',
  validationHandler(boardValidator),
  protect,
  upatedBoard,
);
boardsRouter.delete('/:id', protect, deleteBoard);
