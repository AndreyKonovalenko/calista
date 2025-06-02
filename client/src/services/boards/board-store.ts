import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard, ICardTrimmed, IList } from '../../utils/types';

interface IState extends IBoard {
  calculatedPos: undefined | number;
}

interface IActions {
  setBoardState: (data: IBoard) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  updateListPosByListId: (draggedId: string, pos: number) => void;
  updateCardPosByCardId: (dropListId: string, draggedId:string, pos: number) => void;
  setCalculatedPos: (pos: number | undefined) => void;
  reset: () => void;
}

const initialState: IState = {
  _id: '',
  name: '',
  createrId: '',
  lists: [],
  calculatedPos: undefined,
};

const updateName = (arr: Array<IList>, name: string, id: string) => {
  const index: number = arr.findIndex(element => element._id === id);
  arr[index].name = name;
  return arr;
};

const updatePos = (
  arr: Array<IList>,
  draggedId: string,
  pos: number,
): Array<IList> => {
  const index: number = arr.findIndex(element => element._id === draggedId);
  arr[index].pos = pos;
  return arr;
};

const updateCardPos = (arr: Array<IList>, listId: string, draggedId: string, pos: number): Array<IList> => {
  const dropListIndex =  arr.findIndex(elemet => elemet._id === listId);
  if (dropListIndex) {
    const cardIndex =  arr[dropListIndex].cards.findIndex(element => element._id === draggedId)
    if (cardIndex) {
      arr[dropListIndex].cards[cardIndex].pos = pos
      console.log(arr[dropListIndex].cards[cardIndex].pos, pos)
    }
  }  
  return arr;
}

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
const sortDuePosition = (lists: Array<IList>): Array<IList> => {
  lists
    .sort(ascendingComparator)
    .forEach(elment => elment.cards.sort(ascendingComparator));
  return lists;
};

export const useBoardStore = create<IState & IActions>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: data =>
        set(
          {
            _id: data._id,
            name: data.name,
            createrId: data.createrId,
            lists: sortDuePosition(data.lists),
          },
          undefined,
          'setBoardState',
        ),
      reset: () => set(initialState),
      updateListNameBylistId: (id: string, name: string) =>
        set(
          (state: IState) => ({ lists: updateName(state.lists, name, id) }),
          undefined,
          'updateListName',
        ),
      updateListPosByListId: (draggedId: string, pos: number) =>
        set(
          (state: IState) => ({
            lists: updatePos(state.lists, draggedId, pos)
          }),
          undefined,
          'updateListPos',
        ),
      updateCardPosByCardId:(listId: string, draggedId: string, pos: number) =>
        set((state: IState)=> ({
          lists: updateCardPos(state.lists, listId, draggedId, pos)
        }),undefined, 'updateCardPos'),
      setCalculatedPos: (pos: number | undefined) =>
        set(
          () => ({ calculatedPos: pos }),
          undefined,
          'calculetedNewPos',
        ),
    }),
    { name: 'boardStore' },
  ),
);
