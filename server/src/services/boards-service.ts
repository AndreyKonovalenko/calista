import { Types } from 'mongoose';
import { BoardModel, IBoard } from '../models/BoardModel';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
import { CardModel } from '../models/CardModel';
import { ListModel } from '../models/ListModel';

export async function cerateBoard(data: IBoard) {
  await BoardModel.create(data);
}

export async function findBoards(id: Types.ObjectId) {
  return await BoardModel.find({ createrId: id }).select(['name']);
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
      select: ['name', 'pos'],
    })
    .exec();
}

export async function updateBoardById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  if ('action' in data) {
    if (data.action === 'renumbering') {
      // list renumbering logic
      const board = BoardModel.findById(new Types.ObjectId(id));
    }
  } else {
    await BoardModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
      new: true,
    });
  }
}
