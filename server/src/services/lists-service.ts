import { BoardModel } from '../models/BoardModel';
import { IList, ListModel } from '../models/ListModel';
import { Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
import { CardModel } from '../models/CardModel';

export async function createList(data: IList) {
  const board = await BoardModel.findById(data.boardId);
  if (!board) {
    throw new CustomError(
      `Board id: ${data.boardId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (board) {
    const list = await ListModel.create(data);
    board.lists.push(list._id);
    await board.save();
  }
}

export async function findListById(id: string) {
  return await ListModel.findById(new Types.ObjectId(id)).populate({
    path: 'cards',
    populate: {
      path: 'checkList',
      select: 'name',
    },
  });
}

export async function deleteListById(id: string) {
  await CheckListItemModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CheckListModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CardModel.deleteMany({ boardId: new Types.ObjectId(id) });
  return await ListModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function updateListById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  await ListModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}
