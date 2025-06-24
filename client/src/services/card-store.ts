import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ICard } from '../utils/types';

type TState = Omit<ICard, 'pos'>;

interface IActions {
  setCardState: (data: ICard) => void;
}

const initialState: TState = {
  _id: '',
  name: '',
  description: '',
  checkLists: [],
};

export const useCardStore = create<TState & IActions>()(
  devtools(
    set => ({
      ...initialState,
      setCardState: data =>
        set({
          _id: data._id,
          name: data.name,
          description: data.description,
          checkLists: data.checkLists,
        }),
      reset: () => set(initialState),
    }),
    { name: 'cardState' },
  ),
);
