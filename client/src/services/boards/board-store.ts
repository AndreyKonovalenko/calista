import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TBoard = {
  _id: string;
  createrId: string;
  name: string;
  lists: Array<string>;
};


interface IBoardList {
  _id: string;
  name: string;
  pos: number;
}


interface IBoardState  {
  _id:string;
  createrId: string;
  name: string;
  lists: Array<IBoardList>

}

interface IActions {
  setBoardState: (data: IBoardState) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  reset: () => void;
};

const initialState: IBoardState  = {
  _id: '',
  name: '',
  createrId: '',
  lists: [],
};


const updateName = (arr: Array<IBoardList>, name: string, id:string) => {
  const index: number =  arr.findIndex(element => element._id === id);
  arr[index].name = name;
  return arr
}

type TState = IBoardState & IActions
export const useBoardStore = create<TState>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: (data) =>
        set({
          _id: data._id,
          name: data.name,
          createrId: data.createrId,
          lists: data.lists,
        }),
      reset: () => set(initialState),
      updateListNameBylistId: (id:string, name:string) =>
        set((state: TState ) => ({lists: updateName(state.lists, name, id)})),
    }),
    { name: 'boardStore' },
  ),
);
