import express from 'express';
import { protect } from '../middleware/protected';
import { connectToSse } from '../controllers/sseController';

export const sseRouter = express.Router();
sseRouter.get('/', protect, connectToSse);
// boardsRouter.post('/', protect, addBoard);
// boardsRouter.delete('/:id', protect, deleteBoard);
// boardsRouter.post('/:boardId/lists', protect, addListToBoard);
