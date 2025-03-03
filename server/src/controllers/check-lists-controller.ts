import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../middleware/protected";
import { StatusCodes } from "http-status-codes";
import { ICheckList, ICheckListItem } from "../models/CheckListModel";
import { DeleteResult } from "mongoose";

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

// POST 'checklists/:id/items
export const addCheckListItem = async (res:Response, req: Request, next: NextFunction ) =>{
  try {
    const {user} = req as CustomRequest;
    const data: ICheckListItem = {
    }
  } catch (error){ 
    next(error)
  }
}


// GET 'checklists/:id' @private
export const getCheckList = async (res: Response, req: Request, next: NextFunction) => {
  try {
    const checList = await findCheckListById(req.params.id)
    if(!checList) {
      res.status(StatusCodes.OK).send("CheckList not found")
    }
    if(checList){
      res.status(StatusCodes.OK).json(checList)
    }
  } catch(error) {
    next(error)
  }
}

// PUT 'checklists/:id @private
export const updateChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = {...req.body};
    await updateCheckListById(req.params.id, data)
    res.status(StatusCodes.OK).send('CheckList successfuly updated')
  } catch(error){
    next(error)
  }
}

// DELETE: checklist/:id @private
export const deleteCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteCheckListById(req.params.id)
    if(result.deletedCount> 0 ){
      res.status(StatusCodes.OK).send(`checkList id: ${req.params.id}`)
    } else {
      res.status(StatusCodes.OK).send(`checkList id: ${req.params.id} not found`)
    }
  } catch(error) {
    next(error)
  }
}
