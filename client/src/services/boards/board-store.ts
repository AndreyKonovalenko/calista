import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard, ICardTrimmed, IList, TBoard } from '../../utils/types';

interface IState extends TBoard {
  calculatedPos: undefined | number;
}

interface IActions {
  setBoardState: (data: IBoard) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  updateListPosByListId: (draggedId: string, pos: number) => void;
  // updateCardPosByCardId: (dropListId: string, draggedId:string, pos: number) => void;
  setCalculatedPos: (pos: number | undefined) => void;
  reset: () => void;
}

const initialState: IState = {
  _id: '',
  name: '',
  createrId: '',
  lists: {},
  calculatedPos: undefined,
};

const transformData = (data: IBoard) => {
  const lists = Object.fromEntries(
    data.lists.map(element => {
      const list = element.cards.map(element => [element._id, element]);
      return [element._id, { ...element, cards: Object.fromEntries(list) }];
    }),
  );
  return {
    _id: data._id,
    name: data.name,
    createrId: data.createrId,
    lists: lists,
  };
};

// lists: sortDuePosition(data.lists)

// const updateName = (
//   arr: { [key: string]: TList },
//   name: string,
//   id: string,
// ) => {
//   // const index: number = arr.findIndex(element => element._id === id);
//   // arr[index].name = name;
//   console.log(name, id);
//   return arr;
// };

// const updatePos = (
//   arr: {[key: string]: TList},
//   draggedId: string,
//   pos: number,
// ): Array<IList> => {
//   const index: number = arr.findIndex(element => element._id === draggedId);
//   arr[index].pos = pos;
//   return arr;
// };

// const updateCardPos = (arr: Array<IList>, listId: string, draggedId: string, pos: number): Array<IList> => {
//   const dropListIndex =  arr.findIndex(elemet => elemet._id === listId);
//   if (dropListIndex) {
//     const cardIndex =  arr[dropListIndex].cards.findIndex(element => element._id === draggedId)
//     if (cardIndex) {
//       arr[dropListIndex].cards[cardIndex].pos = pos
//       console.log(arr[dropListIndex].cards[cardIndex].pos, pos)
//     }
//   }
//   return arr;
// }

export function getListNameFromState(arr: Array<IList>, id: string) {
  const list: IList | undefined = arr.find(element => element._id === id);
  return list?.name;
}

export function ascendingComparator(
  a: IList | ICardTrimmed,
  b: IList | ICardTrimmed,
): number {
  if (a.pos < b.pos) return -1;
  if (a.pos > b.pos) return 1;
  return 0;
}

export const useBoardStore = create<IState & IActions>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: data =>
        set(transformData(data), undefined, 'setBoardState'),
      reset: () => set(initialState),
      updateListNameBylistId: (id: string, name: string) =>
        set(
          (state: IState) => ({
            lists: {
              ...state.lists,
              [id]: {
                ...state.lists[id],
                name: name,
              },
            },
          }),
          undefined,
          'updateListName',
        ),
      updateListPosByListId: (draggedId: string, pos: number) =>
        set(
          (state: IState) => ({
            lists: {
              ...state.lists,
              [draggedId]: {
                ...state.lists[draggedId],
                pos: pos,
              },
            },
          }),
          undefined,
          'updateListPos',
        ),
      // updateCardPosByCardId:(listId: string, draggedId: string, pos: number) =>
      //   set((state: IState)=> ({
      //     lists: updateCardPos(state.lists, listId, draggedId, pos)
      //   }),undefined, 'updateCardPos'),
      setCalculatedPos: (pos: number | undefined) =>
        set(() => ({ calculatedPos: pos }), undefined, 'calculetedNewPos'),
    }),
    { name: 'boardStore' },
  ),
);
