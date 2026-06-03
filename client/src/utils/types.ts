export type TForm = Record<string, string>;

export type TDraggableElement = {
  _id: string;
  name?: string;
};

export interface IBoard {
  _id: string;
  createrId: string;
  name: string;
}

// export type TBoard = IBoard & {
//   lists: Record<string, TList>;
// };

export interface IBoardTrimmed {
  _id: string;
  name: string;
}

export interface IList {
  _id: string;
  creterId: string;
  boardId: string;
  name: string;
  pos: number;
}

export interface ICard {
  _id: string;
  createrId: string;
  boardId: string;
  listId: string;
  name: string;
  pos: number;
  description?: string;
}

export interface ICardTrimmed {
  _id: string;
  name: string;
  pos: number;
}

export interface IChecklist {
  _id: string;
  createrId: string;
  baoardId: string;
  listId: string;
  cardId: string;
  name: string;
  pos: number;
}

export interface IChecklistItem {
  _id: string;
  createrId: string;
  boardId: string;
  cardId: string;
  listId: string;
  checklistId: string;
  name: string;
  state: 'complete' | 'incomplete';
  pos: number;
}
