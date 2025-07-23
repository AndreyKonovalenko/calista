import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard } from '../utils/types';

interface IBoardActions {
  setBoard: (data: IBoard) => void;
}

interface IBoardState {
  _id: string;
  createrId: string;
  name: string;
  actions: IBoardActions;
}

export const useBoardStore = create<IBoardState>()(
  devtools(
    set => ({
      _id: '',
      createrId: '',
      name: '',
      actions: {
        setBoard: data =>
          set(
            { _id: data._id, createrId: data.createrId, name: data.name },
            undefined,
            'setBoard',
          ),
      },
    }),
    { name: 'boardStore' },
  ),
);

export const useBoardName = () => useBoardStore(state => state.name);
export const useBoardActions = () => useBoardStore(state => state.actions);
