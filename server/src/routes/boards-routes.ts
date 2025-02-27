import express from 'express';
import {
  getBoards,
  addBoard,
  deleteBoard,
  getBoard,
  upatedBoard,
} from '../controllers/boards-controller';
import { protect } from '../middleware/protected';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', protect, addBoard);
boardsRouter.get('/:id', protect, getBoard);
boardsRouter.put('/:id', protect, upatedBoard);
boardsRouter.delete('/:id', protect, deleteBoard);
