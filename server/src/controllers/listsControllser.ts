
import { Request, Response, Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { CustomRequest } from '../middleware/protected';
import {
  createList,
  findBoardByBoardId,
} from '../services/boardService';





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
