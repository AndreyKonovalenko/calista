import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../middleware/protected';
import { deleteListById, updateListById } from '../services/lists-service';
import { createList } from '../services/lists-service';
import { IList } from '../models/ListModel';
import { DeleteResult } from 'mongoose';


// POST: lists/ @private
// Add new list

export const addList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
    const list: IList = {
      createrId: user._id,
      boardId: req.body.boardId,
      name: req.body.title,
      cards: [],
      pos: req.body.pos ? req.body.pos : 16384 ,
    };
    try {
      await createList(list);
      res.send(StatusCodes.OK).send(`list ${list.name} successfuly created`);    
    } catch (error) {
      next(error);
    }
  }

// PUT lists/:id @private

export const updateList = async (
  req: Request, 
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = {...req.body}
    await updateListById(req.params.id, data)
    res.status(StatusCodes.OK).send('list successfuly upated')
  } catch( error) {
    next(error)
  }
}
 

// DELETE: lists/:id @private

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
      const result: DeleteResult = await deleteListById(
        req.params.id,
      );
      if (result.deletedCount > 0) {
        res.status(StatusCodes.OK).json(` list id: ${req.params.id} deleted`);
      } else {
        res.status(StatusCodes.OK).json(` list id: ${req.params.id} not found `);
      }
   } catch (err) {
      next(err);
  }
}
  
