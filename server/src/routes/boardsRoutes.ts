import express from 'express';
import {
  getBoards,
  addBoard,
  deleteBoard,
  addListToBoard,
} from '../controllers/boardsController';
import { protect } from '../middleware/protected';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', protect, addBoard);
boardsRouter.delete('/:id', protect, deleteBoard);
boardsRouter.post('/:boardId/lists', protect, addListToBoard);
