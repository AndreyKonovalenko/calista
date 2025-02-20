import { Types } from 'mongoose';
import { BoardModel, IBoard } from '../models/BoardModel';
import { CheckListItemModal, CheckListModal } from '../models/CheckListModel';
import { CardModal } from '../models/CardModel';
import { ListModal } from '../models/ListModel';

export async function findBoards(id: Types.ObjectId) {
  return await BoardModel.find({ createrId: id });
}

export async function deleteBoardById(id: string) {
  await CheckListItemModal.deleteMany({boardId: new Types.ObjectId(id)})
  await CheckListModal.deleteMany({boardId: new Types.ObjectId(id)})
  await CardModal.deleteMany({boardId: new Types.ObjectId(id)})
  await ListModal.deleteMany({boardId: new Types.ObjectId(id)})
  return await BoardModel.deleteOne({ _id: new Types.ObjectId(id)});
}

export async function cerateBoard(data:IBoard) {
 return await BoardModel.create(data)
}

export async function findBoardById(id:string) {
 return await BoardModel.findById(id).populate({path: "lists", populate: {
  path: 'cards',
  populate: {
    path: 'checkList',
    populate: {
      path: 'checkItems'
    }
  }
 }}).exec()
}