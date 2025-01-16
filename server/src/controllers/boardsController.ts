import { NextFunction, Request, Response } from 'express';
import { IBoard } from '../models';
import { StatusCodes } from 'http-status-codes';
import { MongooseError, HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { CustomError } from '../utils';
import { BoardModal } from '../models';

// GET: borads/
export const getBoards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | null = await BoardModal.find({creater_id: user._id})
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(error) 
  }
};

// POST: boards/
export const addBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req as CustomRequest;
  const board: IBoard = {
    title: req.body.title,
    creater_id: user._id,
    lists: [],
  };
  try {
    const newBoard = await BoardModal.create(board)
    res.status(StatusCodes.OK).json(newBoard);
  } catch (error) {
    next(error)
  }
};

// DELETE: boards/:id
export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

 try {
  const result = await BoardModal.deleteOne({_id: req.params.id})
  console.log(result)
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} deleted`);
    } else {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} not found `);
    }
  } catch (error) {
    if(error instanceof MongooseError && error.name === 'CastError'){ 
      next(new CustomError(`Borad by id: ${req.params.id} not found`, StatusCodes.INTERNAL_SERVER_ERROR ))
    } else {
      next(error) 
    }
  }
}; 
