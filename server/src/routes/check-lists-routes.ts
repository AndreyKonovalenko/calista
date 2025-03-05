import express from 'express';
import { protect } from '../middleware/protected';
import {
  addCheckList,
  addCheckListItem,
  deleteCheckList,
  getCheckList,
  getCheckListItem,
  updateCheckList,
  updateChecklistItem,
} from '../controllers/check-lists-controller';

export const checkListsRouter = express.Router();
checkListsRouter.post('/', protect, addCheckList);
checkListsRouter.post('/:id/itemes/', protect, addCheckListItem);
checkListsRouter.get('/:id', protect, getCheckList);
checkListsRouter.get('/:id/items/:itmeId', protect, getCheckListItem);
checkListsRouter.put('/:id', protect, updateCheckList);
checkListsRouter.put('/:id/items/:itemId', protect, updateChecklistItem);
checkListsRouter.delete('/:id', protect, deleteCheckList);
checkListsRouter.delete('/:id/items/:itemId', protect, deleteCheckList);
