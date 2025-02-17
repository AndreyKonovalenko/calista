import express from 'express';
import { getBoards, addBoard, deleteBoard, getBoard } from '../controllers/boards-controller';
import { protect } from '../middleware/protected';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', protect, addBoard);
boardsRouter.delete('/:id', protect, deleteBoard);
boardsRouter.get('/:id', protect, getBoard);