import express from 'express';
import { protect } from '../middleware/protected';
import {
  addChecklistItem,
  deleteChecklistItem,
  getChecklistItem,
  updateChecklistItem,
} from '../controllers/checklist-items-controller';
export const checklistItemsRouter = express.Router();

checklistItemsRouter.post('/', protect, addChecklistItem);
checklistItemsRouter.get('/:id', protect, getChecklistItem);
checklistItemsRouter.put('/:id', protect, updateChecklistItem);
checklistItemsRouter.delete('/:id', protect, deleteChecklistItem);
