import { Request, Response, Application } from 'express';
import { IBoard } from '../models';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { HydratedDocument } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import {
  createBoard,
  findBoardsByCreaterId,
  findBoardByBoardId,
  createList,
} from '../services/boardService';

// GET: borads/
export const getBoards = (async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | null =
      await findBoardsByCreaterId(user._id);
    return res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getErrorMessage(error));
  }
}) as Application;

// POST: boards/
export const addBoard = (async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  const board: IBoard = {
    title: req.body.title,
    creater_id: user._id,
    lists: [],
  };
  try {
    const newBoard = await createBoard(board);
    return res.status(StatusCodes.OK).json(newBoard);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getErrorMessage(error));
  }
}) as Application;

// DELETE: boards/:id
type TDeleteOneResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export const deleteBoard = (async (req: Request, res: Response) => {
  const board = await findBoardByBoardId(req.params.id);
  if (!board) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(getErrorMessage(`Board by id: ${req.params.id} not found`));
  }
  if (board) {
    try {
      board
        .deleteOne()
        .then((result: TDeleteOneResult) => {
          if (result.deletedCount > 0) {
            return res
              .status(StatusCodes.OK)
              .json(` boad id: ${req.params.id} deleted`);
          } else {
            return res
              .status(StatusCodes.OK)
              .json(` bourd id: ${req.params.id} not found `);
          }
        })
        .catch((error: unknown) => {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(getErrorMessage(error));
        });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
  }
}) as Application;

// POST: boards/:boardId/lists
export const addListToBoard = (async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  const currentBoard = await findBoardByBoardId(req.params.boardId);

  if (!currentBoard) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(getErrorMessage(`Board by id: ${req.params.id} not found`));
  }

  if (currentBoard) {
    const list = {
      title: req.body.title,
      creater_id: user?._id,
      cards: [],
    };
    try {
      const newList = await createList(list);
      const newListId = newList?._id;
      // save to specific board by it id
      try {
        currentBoard.lists.push(newListId);
        const upadatedBorad = await currentBoard.save();
        console.log(upadatedBorad);
        return res
          .status(StatusCodes.OK)
          .json(
            `list id: ${newListId} added to board ${req.params.id} successfully`,
          );
      } catch (error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(
            getErrorMessage(
              `Board id: ${req.params.id} has not been updated with list id: ${newListId} ${error}`,
            ),
          );
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
  }
}) as Application;
