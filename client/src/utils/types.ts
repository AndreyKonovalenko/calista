export type TForm = {
  [key: string]: string;
};

export type TDraggableElement = {
  _id: string;
  name?: string;
  pos: number;
};

export interface IBoard {
  _id: string;
  createrId: string;
  name: string;
  lists: Array<IList>;
}

export type TBoard = {
  _id: string;
  createrId: string;
  name: string;
  lists:{[key: string]: TList};
}

export interface IBoardTrimmed {
  _id: string;
  name: string;
}

export interface IList {
  _id: string;
  name: string;
  cards: Array<ICardTrimmed>;
  pos: number;
}

export type TList = {
  _id: string;
  name: string; 
  cards:{[key: string]: ICardTrimmed}
  pos: number;
}

export interface ICard {
  _id: string;
  name: string;
  pos: number;
  description?: string;
  checkLists: Array<ICheckList>;
}

export interface ICardTrimmed {
  _id: string;
  name: string;
  pos: number;
}

export interface ICheckList {
  _id: string;
  checkItems?: Array<ICheckListItem>;
  name: string;
}

export interface ICheckListItem {
  _id: string;
  name: string;
  state: 'complite' | 'incomplite';
  pos: number;
}
