import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TPopulatedBoard } from '../../api/calista-api';

export type TBoard = {
  _id: string;
  createrId: string;
  name: string;
  lists: Array<string>;
};

type TBoardState = TPopulatedBoard;

type Actions = {
  setBoardState: (data: TPopulatedBoard) => void;
  // updateListNameBylistId: (id: string, name: string) => void;
  reset: () => void;
};

const initialState: TPopulatedBoard = {
  _id: '',
  name: '',
  createrId: '',
  lists: [],
};

export const useBoardStore = create<TBoardState & Actions>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: (data: TPopulatedBoard) =>
        set({
          _id: data._id,
          name: data.name,
          createrId: data.createrId,
          lists: data.lists,
        }),
      reset: () => set(initialState),
      // updateListNameBylistId: (id, name) =>
      //   set(state => {
      //     state.lists.find(elemne => elemne._id === id);
      //   }),
    }),
    { name: 'boardStore' },
  ),
);
