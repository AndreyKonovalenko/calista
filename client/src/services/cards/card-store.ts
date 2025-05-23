import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ICard {
  _id: string;
  createrId: string;
  boardId: string;
  listId: string;
  name: string;
  checkLists: Array<string>;
  pos: number | undefined;
}

interface IActions {
  setCardState: (data: ICard) => void;
}

const initialState: ICard = {
  _id: '',
  createrId: '',
  boardId: '',
  listId: '',
  name: '',
  checkLists: [],
  pos: undefined,
};

type TState = ICard & IActions;

export const useCardStore = create<TState>()(
  devtools(
    set => ({
      ...initialState,
      setCardState: data =>
        set({
          _id: data._id,
          createrId: data.createrId,
          boardId: data.boardId,
          listId: data.listId,
          name: data.name,
          checkLists: data.checkLists,
          pos: data.pos,
        }),
      reset: () => set(initialState),
    }),
    { name: 'cardState' },
  ),
);
