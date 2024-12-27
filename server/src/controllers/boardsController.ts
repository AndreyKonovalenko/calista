import { Request, Response } from 'express';
import { IBoard } from '../models';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import {
  createBoard,
  findBoardsByCreaterId,
  findBoardByBoardId,
} from '../services/boardService';

// GET: borads/
export const getBoards = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | null =
      await findBoardsByCreaterId(user._id);
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getErrorMessage(error));
  }
};

// POST: boards/
export const addBoard = async (req: Request, res: Response): Promise<void> => {
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getErrorMessage(error));
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
): Promise<void> => {
  const board = await findBoardByBoardId(req.params.id);
  if (!board) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getErrorMessage(`Board by id: ${req.params.id} not found`));
  }
  if (board) {
    try {
      board
        .deleteOne()
        .then((result: TDeleteOneResult) => {
          if (result.deletedCount > 0) {
            res
              .status(StatusCodes.OK)
              .json(` board id: ${req.params.id} deleted`);
          } else {
            res
              .status(StatusCodes.OK)
              .json(` board id: ${req.params.id} not found `);
          }
        })
        .catch((error: unknown) => {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(getErrorMessage(error));
        });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
  }
};
