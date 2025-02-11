import {Types} from 'mongoose'
import { BoardModel } from '../models/BoardModel'

export async function  getBoardsService(id:Types.ObjectId) {
  const boards = await BoardModel.find({createrId: id}) 
  return boards;
}