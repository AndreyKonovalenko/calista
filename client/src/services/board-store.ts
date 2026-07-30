import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IBoard } from '../utils/types';

interface IBoardActions {
  setBoard: (data: IBoard) => void;
  clearBoard: () => void;
}

interface IBoardState {
  _id: string;
  creatorId: string;
  name: string;
  actions: IBoardActions;
}

export const useBoardStore = create<IBoardState>()(
  devtools(
    set => ({
      _id: '',
      creatorId: '',
      name: '',
      actions: {
        setBoard: data =>
          set(
            { _id: data._id, creatorId: data.creatorId, name: data.name },
            undefined,
            'setBoard',
          ),
        clearBoard: () =>
          set({
            _id: '',
            creatorId: '',
            name: '',
          }),
      },
    }),
    { name: 'boardStore' },
  ),
);

export const useBoardName = () =>
  useBoardStore(state => state.name);
export const useBoardActions = () => useBoardStore(state => state.actions);
