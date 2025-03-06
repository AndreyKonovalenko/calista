import { Response, Request, NextFunction } from 'express';
import { CustomRequest } from '../middleware/protected';
import { StatusCodes } from 'http-status-codes';
import { ICheckList, ICheckListItem } from '../models/CheckListModel';
import { DeleteResult } from 'mongoose';
import {
  createCheckList,
  createCheckListItem,
  findCheckListById,
  findCheckListItemById,
  deleteCheckListById,
  deleteCheckLisItemById,
  updateCheckListById,
  updateChecklistItemById,
} from '../services/check-lists-service';

// POST 'checklists/' @private
export const addCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as CustomRequest;
    const data: ICheckList = {
      createrId: user._id,
      boardId: req.body.boardId,
      listId: req.body.listId,
      cardId: req.body.cardId,
      name: req.body.name,
      checkItems: [],
    };
    await createCheckList(data);
    res.status(StatusCodes.OK).send(`board ${data.name} successfuly created`);
  } catch (error) {
    next(error);
  }
};

// POST 'checklists/:id/items
export const addCheckListItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as CustomRequest;
    const data: ICheckListItem = {
      createrId: user._id,
      checkListId: req.body.checkListId,
      boardId: req.body.boardId,
      listId: req.body.listId,
      cardId: req.body.cardId,
      name: req.body.name,
      state: 'incomplite',
      pos: req.body.pos ? req.body.pos : 16384,
    };
    await createCheckListItem(data);
    res.status(StatusCodes.OK).send(`item ${data.name} succesfuly created`);
  } catch (error) {
    next(error);
  }
};

// GET 'checklists/:id' @private
export const getCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const checList = await findCheckListById(req.params.id);
    if (!checList) {
      res.status(StatusCodes.OK).send('CheckList not found');
    }
    if (checList) {
      res.status(StatusCodes.OK).json(checList);
    }
  } catch (error) {
    next(error);
  }
};

// GET 'checklists/:id/itmes/:itemId
export const getCheckListItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const checkListItem = await findCheckListItemById(req.params.checkItemId);
    if (!checkListItem) {
      res.status(StatusCodes.OK).send('CheckListItem not found');
    }
    if (checkListItem) {
      res.status(StatusCodes.OK).json(checkListItem);
    }
  } catch (error) {
    next(error);
  }
};

// PUT 'checklists/:id @private
export const updateCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateCheckListById(req.params.id, data);
    res.status(StatusCodes.OK).send('CheckList successfulfy updated');
  } catch (error) {
    next(error);
  }
};

// PUT 'checklists:/:id/items/:itemId

export const updateChecklistItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateChecklistItemById(req.params.itemId, data);
    res.status(StatusCodes.OK).send('check list item succefully updated');
  } catch (error) {
    next(error);
  }
};

// DELETE: checklists/:id/ @private
export const deleteCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteCheckListById(req.params.id);
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).send(`checkList id: ${req.params.id} deleted`);
    } else {
      res
        .status(StatusCodes.OK)
        .send(`checkList id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE: checklists/:id/items/:itemId:
export const deletedCheckListItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteCheckLisItemById(
      req.params.ietmId,
    );
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).send(`item id: ${req.params.itemId} deleted`);
    } else {
      res
        .status(StatusCodes.OK)
        .send(`item id: ${req.params.ietmId} not found`);
    }
  } catch (error) {
    next(error);
  }
};
