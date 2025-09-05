import express from 'express';
import { protect } from '../middleware/protected';
import {
  addChecklist,
  deleteChecklist,
  getChecklist,
  updateChecklist,
} from '../controllers/checklists-controller';

export const checklistsRouter = express.Router();
checklistsRouter.post('/', protect, addChecklist);
checklistsRouter.get('/:id', protect, getChecklist);
checklistsRouter.put('/:id', protect, updateChecklist);
checklistsRouter.delete('/:id', protect, deleteChecklist);
