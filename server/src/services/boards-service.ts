import { Types } from 'mongoose';
import { BoardModel } from '../models/BoardModel';

export async function findBoards(id: Types.ObjectId) {
  return await BoardModel.find({ createrId: id });
}

export async function deleteBoardById(id: string) {
  // get board by id.
  // get all nested list by  array[id]
  // delete all cards and cards items inside nested lists
  // finaly deleted barrd
  return await BoardModel.deleteOne({ _id: new Types.ObjectId(id) });
}

