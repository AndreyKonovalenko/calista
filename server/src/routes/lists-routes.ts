import express from 'express';
import {
  addList,
  deleteList,
  getList,
  updateList,
} from '../controllers/lists-controller';

import { protect } from '../middleware/protected';

export const listsRouter = express.Router();
listsRouter.post('/', protect, addList);
listsRouter.get('/:id', protect, getList);
listsRouter.put('/:id', protect, updateList);
listsRouter.delete('/:id', protect, deleteList);
