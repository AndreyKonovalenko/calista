import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../middleware/protected";
import { StatusCodes } from "http-status-codes";
import { ICheckList } from "../models/CheckListModel";

// POST 'checklists/' @private
export const addCheckList = async ( res: Response, req: Request, next: NextFunction ) => {
  try {
    const {user} = req as CustomRequest;
    const data: ICheckList = {
      createrId: user._id,
      boardId: req.body.boardId,
      listId: req.body.listId,
      cardId: req.body.cardId,
      name: req.body.name,
      checkItems: []
    }
    await createCheckList(data)
    res.status(StatusCodes.OK).send(`board ${data.name} successfuly created`);
  } catch(error) {
    next(error)
  }
}

// GET 'checklists/:id' @private

export const getCheckList = async (res: Response, req: Request, next: NextFunction) => {
  try {

  } catch(error) {
    next(error)
  }
}