import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard, IList } from '../../utils/types';

interface IState extends IBoard {
  calculatedListPos: undefined | number;
}

interface IActions {
  setBoardState: (data: IBoard) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  updateListPosByListId: (draggedId: string, pos: number) => void;
  setCalculatedListPos: (pos: number | undefined) => void;
  reset: () => void;
}

const initialState: IState = {
  _id: '',
  name: '',
  createrId: '',
  lists: [],
  calculatedListPos: undefined,
};

const updateName = (arr: Array<IList>, name: string, id: string) => {
  const index: number = arr.findIndex(element => element._id === id);
  arr[index].name = name;
  return arr;
};

const updatePos = (
  arr: Array<IList>,
  pos: number,
  draggedId: string,
): Array<IList> => {
  const index: number = arr.findIndex(element => element._id === draggedId);
  arr[index].pos = pos;
  return arr;
};

export function getListNameFromState(arr: Array<IList>, id: string) {
  const list: IList | undefined = arr.find(element => element._id === id);
  return list?.name;
}

export function ascendingComparator(a: IList, b: IList): number {
  if (a.pos < b.pos) return -1;
  if (a.pos > b.pos) return 1;
  return 0;
}

export const useBoardStore = create<IState & IActions>()(
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
        set((state: IState) => ({ lists: updateName(state.lists, name, id) })),
      updateListPosByListId: (draggedId: string, pos: number) =>
        set((state: IState) => ({
          lists: updatePos(state.lists, pos, draggedId),
        })),
      setCalculatedListPos: (pos: number | undefined) =>
        set(() => ({ calculatedListPos: pos })),
    }),
    { name: 'boardStore' },
  ),
);

// disable devtools for be able to debug react-dnd

// export const useBoardStore = create<TState>()(set => ({
//   ...initialState,
//   setBoardState: data =>
//     set({
//       _id: data._id,
//       name: data.name,
//       createrId: data.createrId,
//       lists: data.lists.sort(ascendingComparator),
//     }),
//   reset: () => set(initialState),
//   updateListNameBylistId: (id: string, name: string) =>
//     set((state: TState) => ({ lists: updateName(state.lists, name, id) })),
//   updateListPosByListId: (id: string, pos: number) =>
//     set((state: TState) => ({ lists: updatePos(state.lists, pos, id) })),
//   updateListsOrder: (hoveredId: string, draggedId: string) =>
//     set((state: TState) => ({
//       lists: upadteOrder(state.lists, hoveredId, draggedId),
//     })),
// }));
