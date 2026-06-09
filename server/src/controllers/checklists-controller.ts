import { Response, Request, NextFunction } from 'express';
import { CustomRequest } from '../middleware/protected';
import { StatusCodes } from 'http-status-codes';
import { IChecklist } from '../models/ChecklistModel';
import { DeleteResult } from 'mongoose';
import {
  createChecklist,
  findChecklistById,
  deleteChecklistById,
  updateChecklistById,
} from '../services/checklists-service';

// POST 'checklists/' @private
export const addChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as CustomRequest;
    const data: IChecklist = {
      creatorId: user._id,
      boardId: req.body.boardId,
      listId: req.body.listId,
      cardId: req.body.cardId,
      name: req.body.name,
      pos: req.body.pos ? req.body.pos : 16384,
    };
    await createChecklist(data);
    res.status(StatusCodes.OK).send(`board ${data.name} successfuly created`);
  } catch (error) {
    next(error);
  }
};

// GET 'checklists/:id' @private
export const getChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const checklist = await findChecklistById(req.params.id);
    if (!checklist) {
      res.status(StatusCodes.OK).send('Checklist not found');
    }
    if (checklist) {
      res.status(StatusCodes.OK).json(checklist);
    }
  } catch (error) {
    next(error);
  }
};

// PUT 'checklists/:id @private
export const updateChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateChecklistById(req.params.id, data);
    res.status(StatusCodes.OK).send('Checklist successfully updated');
  } catch (error) {
    next(error);
  }
};

// DELETE: checklists/:id/ @private
export const deleteChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteChecklistById(req.params.id);
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).send(`checklist id: ${req.params.id} deleted`);
    } else {
      res
        .status(StatusCodes.OK)
        .send(`checklist id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};
