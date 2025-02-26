import express from 'express';
import { addList, deleteList, updateList } from '../controllers/lists-controller';

import { protect } from '../middleware/protected';

export const listsRouter = express.Router();
listsRouter.post('/', protect, addList);
listsRouter.delete('/:id', protect, deleteList);
listsRouter.put('/:id', protect, updateList);