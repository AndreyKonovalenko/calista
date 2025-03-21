// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
export interface IList {
  _id: string;
  name: string;
  boardId: string;
  createrId: string;
  cards: Array<string>;
  pos: number;
}

// const initialState: TList = {
//   _id: '',
//   name: '',
//   boardId: '',
//   createrId: '',
//   cards: [],
// };
