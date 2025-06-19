import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard, ICardTrimmed, IList, TBoard, TList } from '../../utils/types';
// import { calculateNewPosition } from '../../utils/utils';

interface IState extends TBoard {
  calculatedPos: null | number;
}

interface IActions {
  setBoardState: (data: IBoard) => void;
  updateListNameBylistId: (id: string, name: string) => void;
  updateListPosByListId: (draggedId: string, pos: number) => void;
  moveCard: (draggedId: string, dropListId: string, pos: number) => void;
  setCalculatedPos: (pos: number | null) => void;
  reset: () => void;
}

const initialState: IState = {
  _id: '',
  name: '',
  createrId: '',
  lists: {},
  calculatedPos: null,
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

const updateCardPosState = (
  lists: { [kye: string]: TList },
  draggedId: string,
  dropListId: string,
  newPos: number,
): { [key: string]: TList } => {
  let sourceList = null;
  for (const [, list] of Object.entries(lists)) {
    for (const [, cards] of Object.entries(list)) {
      for (const [card] of Object.entries(cards)) {
        if (card === draggedId) {
          sourceList = list._id;
        }
      }
    }
  }

  if (dropListId === sourceList) {
    return {
      ...lists,
      [dropListId]: {
        ...lists[dropListId],
        cards: {
          ...lists[dropListId].cards,
          [draggedId]: {
            ...lists[dropListId].cards[draggedId],
            pos: newPos,
          },
        },
      },
    };
  }
  const dropListLength = Object.keys(lists[dropListId].cards).length;

  if (sourceList && dropListId !== sourceList && dropListLength !== 0) {
    return {
      ...lists,
      [dropListId]: {
        ...lists[dropListId],
        cards: {
          ...lists[dropListId].cards,
          [draggedId]: {
            ...lists[sourceList].cards[draggedId],
            pos: newPos,
          },
        },
      },
      [sourceList]: {
        ...lists[sourceList],
        cards: Object.fromEntries(
          Object.entries(lists[sourceList].cards).filter(
            ([key]) => key !== draggedId,
          ),
        ),
      },
    };
  }

  // cards is empty object case
  if (sourceList && dropListId !== sourceList && dropListLength === 0) {
    return {
      ...lists,
      [dropListId]: {
        ...lists[dropListId],
        cards: {
          [draggedId]: {
            ...lists[sourceList].cards[draggedId],
            pos: newPos,
          },
        },
      },
      [sourceList]: {
        ...lists[sourceList],
        cards: Object.fromEntries(
          Object.entries(lists[sourceList].cards).filter(
            ([key]) => key !== draggedId,
          ),
        ),
      },
    };
  }

  return lists;
};

export const useBoardStore = create<IState & IActions>()(
  devtools(
    set => ({
      ...initialState,
      setBoardState: data =>
        set(transformData(data), undefined, 'setBoardState'),
      reset: () => set(initialState),
      updateListNameBylistId: (id: string, name: string) =>
        set(
          state => ({
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
          state => ({
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
      moveCard: (draggedId: string, dropListId: string, pos: number) =>
        set(
          state => ({
            lists: updateCardPosState(state.lists, draggedId, dropListId, pos),
          }),
          undefined,
          'updateCardPos',
        ),
      setCalculatedPos: (pos: number | null) =>
        set(() => ({ calculatedPos: pos }), undefined, 'calculetedNewPos'),
    }),
    { name: 'boardStore' },
  ),
);

// updateCardPosState(state.lists, draggedId, dropListId, dragListId, pos: number)
