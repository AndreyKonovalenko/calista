import { Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import {
  ChecklistModel,
  IChecklist,
} from '../models/ChecklistModel';
import { CardModel } from '../models/CardModel';

export async function createChecklist(data: IChecklist) {
  const card = await CardModel.findById(data.cardId);
  if (!card) {
    throw new CustomError(
      `Card id: ${data.boardId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (card) {
    const checkList = await ChecklistModel.create(data);
    card.checkLists.push(checkList._id);
    await card.save();
  }
}


export async function findCheckListById(id: string) {
  return await CheckListModel.findById(new Types.ObjectId(id)).populate({
    path: 'checkItems',
    select: ['name', 'state'],
  });
}


export async function deleteCheckListById(id: string) {
  // clear parent arrey of id references
  const checkList = await CheckListModel.findById(new Types.ObjectId(id));
  const card = await CardModel.findById(checkList?.cardId);
  if (card) {
    card.checkLists = card.checkLists.filter(element => {
      return element.equals(new Types.ObjectId(id)) === false;
    });
    await card.save();
  }
  await CheckListItemModel.deleteMany({ checkListId: new Types.ObjectId(id) });
  return await CheckListModel.deleteOne({ _id: new Types.ObjectId(id) });
}


export async function updateCheckListById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  await CheckListModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}


