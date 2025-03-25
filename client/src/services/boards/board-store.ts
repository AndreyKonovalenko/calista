import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IList } from '../lists/list-store';

export interface IBoard {
  _id: string;
  createrId: string;
  name: string;
  lists: Array<IList>;
}

interface IActions {
  setBoardState: (data: IBoard) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  reset: () => void;
}

const initialState: IBoard = {
  _id: '',
  name: '',
  createrId: '',
  lists: [],
};

const updateName = (arr: Array<IList>, name: string, id: string) => {
  const index: number = arr.findIndex(element => element._id === id);
  arr[index].name = name;
  return arr;
};

export function getListNameFromState(arr: Array<IList>, id: string) {
  const list: IList | undefined = arr.find(element => element._id === id);
  return list?.name;
}

type TState = IBoard & IActions;


export function ascendingComparator (a:IList, b: IList): number {
  if (a.pos < b.pos) return -1;
  if (a.pos > b.pos) return 1;
  return 0
}


export const useBoardStore = create<TState>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: data =>
        set({
          _id: data._id,
          name: data.name,
          createrId: data.createrId,
          lists: data.lists.sort(ascendingComparator),
        }),
      reset: () => set(initialState),
      updateListNameBylistId: (id: string, name: string) =>
        set((state: TState) => ({ lists: updateName(state.lists, name, id) })),
    }),
    { name: 'boardStore' },
  ),
);
