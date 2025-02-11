import { Types } from 'mongoose';
import { BoardModel } from '../models/BoardModel';

async function getBoards(id: Types.ObjectId) {
  return await BoardModel.find({ createrId: id });
}

export default {
  getBoards,
};
