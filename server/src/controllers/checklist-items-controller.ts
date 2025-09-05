import { Response, Request, NextFunction } from 'express';
import { CustomRequest } from '../middleware/protected';
import { StatusCodes } from 'http-status-codes';
import { DeleteResult } from 'mongoose';
import { IChecklistItem } from '../models/ChecklistItemMedel';
import {
  createChecklistItem,
  findChecklistItemById,
  updateChecklistItemById,
  deleteCheckLisItemById,
} from '../services/checklists-items-sevice';

// POST 'checklist_items/' @private
export const addChecklistItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as CustomRequest;
    const data: IChecklistItem = {
      createrId: user._id,
      boardId: req.body.boardId,
      listId: req.body.listId,
      cardId: req.body.cardId,
      checklistId: req.body.checklistId,
      name: req.body.name,
      state: 'incomplite',
      pos: req.body.pos ? req.body.pos : 16384,
    };
    await createChecklistItem(data);
    res
      .status(StatusCodes.OK)
      .send(`ChecklistItem ${data.name} successfully created`);
  } catch (error) {
    next(error);
  }
};

// GET 'checklist_items/:id @private
export const getChecklistItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const checklistItem = await findChecklistItemById(req.params.id);
    if (!checklistItem) {
      res.status(StatusCodes.OK).send('ChecklistItem not found');
    }
    if (checklistItem) {
      res.status(StatusCodes.OK).json(checklistItem);
    }
  } catch (error) {
    next(error);
  }
};

// PUT 'checklist_items/:id @private
export const updateChecklistItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateChecklistItemById(req.params.id, data);
    res.status(StatusCodes.OK).send('ChecklistItem successfully updated');
  } catch (error) {
    next(error);
  }
};

// DELETE: checklist_items/:id @private
export const deleteChecklistItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteCheckLisItemById(req.params.id);
    if (result.deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .send(`ChecklistItem id: ${req.params.id} deleted`);
    } else {
      res
        .status(StatusCodes.OK)
        .send(`Checklistitem id: ${req.params.ietmId} not found`);
    }
  } catch (error) {
    next(error);
  }
};
