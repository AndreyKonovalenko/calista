import express from 'express';

import { protect } from '../middleware/protected';

export const boardsRouter = express.Router();
boardsRouter.get('/', protect, getBoards);
boardsRouter.post('/', protect, addBoard);
boardsRouter.delete('/:id', protect, deleteBoard);