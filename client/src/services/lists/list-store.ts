// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
export interface IList {
  _id: string;
  name: string;
  boardId: string;
  createrId: string;
  cards: Array<{ _id: string; name: string; pos: number }>;
  pos: number;
}

// const initialState: TList = {
//   _id: '',
//   name: '',
//   boardId: '',
//   createrId: '',
//   cards: [],
// };
