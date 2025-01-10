import { NextFunction, Request, Response } from 'express';
import { IBoard } from '../models';
import { StatusCodes } from 'http-status-codes';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import {
  createBoard,
  findBoardsByCreaterId,
  findBoardByBoardId,
} from '../services/boardService';
import { getErrorMessage, CustomError } from '../utils';


// GET: borads/
export const getBoards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | null =
      await findBoardsByCreaterId(user._id);
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
    const newBoard = await createBoard(board);
    res.status(StatusCodes.OK).json(newBoard);
  } catch (error) {
    next(error)
  }
};

// DELETE: boards/:id
type TDeleteOneResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const board =  await findBoardByBoardId(req.params.id);

  // if (!board) {
  //   const error = new CustomError(`List by id: ${req.params.id} not found`, StatusCodes.INTERNAL_SERVER_ERROR )
  // //   next(error)
  // }

  if (board) {
    board
      .deleteOne()
        .then((result: TDeleteOneResult) => {
          if (result.deletedCount > 0) {
            return  res
              .status(StatusCodes.OK)
              .json(` board id: ${req.params.id} deleted`);
          } else {
            return res
              .status(StatusCodes.OK)
              .json(` board id: ${req.params.id} not found `);
          }
        })
        .catch((error) => {
          next(error)
        });
      } 
}; 
