import { Types } from 'mongoose';
import { BoardModel, IBoard } from '../models/BoardModel';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
import { CardModel } from '../models/CardModel';
import { ListModel } from '../models/ListModel';

export async function cerateBoard(data: IBoard) {
  await BoardModel.create(data);
}

export async function findBoards(id: Types.ObjectId) {
  return await BoardModel.find({ _id: id });
}

export async function deleteBoardById(id: string) {
  await CheckListItemModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CheckListModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CardModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await ListModel.deleteMany({ boardId: new Types.ObjectId(id) });
  return await BoardModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function findBoardById(id: string) {
  return await BoardModel.findById(new Types.ObjectId(id))
    .populate({
      path: 'lists',
      populate: {
        path: 'cards',
        populate: {
          path: 'checkLists',
          select: 'name',
        },
      },
    })
    .exec();
}

export async function updateBoardById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  await BoardModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}
