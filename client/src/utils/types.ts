export type TForm = {
  [key: string]: string;
};

export type TDraggableElement = {
  _id: string;
  name?: string;
};

export interface IBoard {
  _id: string;
  createrId: string;
  name: string;
}

export type TBoard = {
  _id: string;
  createrId: string;
  name: string;
  lists: { [key: string]: TList };
};

export interface IBoardTrimmed {
  _id: string;
  name: string;
}

export interface IList {
  _id: string;
  name: string;
  pos: number;
}

export type TList = {
  _id: string;
  name: string;
  cards: { [key: string]: ICardTrimmed };
  pos: number;
};

export interface ICard {
  _id: string;
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
  name: string;
  pos: string;
}

export interface IChecklistItem {
  _id: string;
  name: string;
  state: 'complite' | 'incomplite';
  pos: number;
}
