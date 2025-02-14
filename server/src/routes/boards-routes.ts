import express from 'express';
import { getBoards, addBoard, deleteBoard } from '../controllers/boards-controller';
import { protect } from '../middleware/protected';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', protect, addBoard);
boardsRouter.delete('/:id', protect, deleteBoard);