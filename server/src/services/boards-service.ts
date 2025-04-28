import { Types } from 'mongoose';
import { BoardModel, IBoard } from '../models/BoardModel';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
import { CardModel } from '../models/CardModel';
import { ListModel } from '../models/ListModel';
import { ascendingComparator } from '../utils/utils';

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
      const board = await BoardModel.findById(new Types.ObjectId(id))
        .populate<{ lists: { _id: Types.ObjectId; pos: number }[] }>({
          path: 'lists',
          select: ['pos'],
        })
        .exec();
      if (board && board.lists.length > 0) {
        const sorableList = board.lists;
        sorableList.sort(ascendingComparator);
        let position = 16384;
        for (const element of sorableList) {
          await ListModel.findByIdAndUpdate(
            new Types.ObjectId(element._id),
            { pos: position },
            { new: true },
          );
          position = position + 16348;
        }
      }
    }
  } else {
    await BoardModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
      new: true,
    });
  }
}
