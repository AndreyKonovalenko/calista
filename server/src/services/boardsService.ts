import { Types } from 'mongoose';
import { BoardModel } from '../models/BoardModel';

async function getBoards(id: Types.ObjectId) {
  return await BoardModel.find({ createrId: id });
}

async function deleteBoardById(id: string) {
  // get board by id.
  // get all nested list by  array[id]
  // delete all cards and cards items inside nested lists
  // finaly deleted barrd
  return await BoardModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export default {
  getBoards,
  deleteBoardById,
};
