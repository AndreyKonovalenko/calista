import { BoardModal, TBoard, TBoardDocument, TList, TListDocument, TCard, TCardDocument, ListModal } from '../models';
import { Types } from 'mongoose';

export async function createBoard(
	board: TBoard
): Promise<null | TBoardDocument> {
	const newBoard: TBoardDocument = await BoardModal.create(board);
	return newBoard ? newBoard : null;
}

export async function findBoardsByCreaterId(
	id: Types.ObjectId
): Promise<null | Array<TBoardDocument>> {
	const boards: Array<TBoardDocument> = await BoardModal.find({
		creater_id: id,
	});
	return boards ? boards : null;
}

export async function findBoardByBoradId(id: string ): Promise<null | TBoardDocument>{
  const board: TBoardDocument | null = await BoardModal.findOne({_id: id});
  return board ? board: null;
}

export async function createList(
  list : TList
): Promise<null | TListDocument> {
  const newList: TListDocument= await ListModal.create(list);
  return newList? newList:null
}