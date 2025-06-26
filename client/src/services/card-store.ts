import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { ICard } from '../utils/types';

interface ICardActions {
  setCards: (data: { [kay: string]: ICard }) => void;
}

interface ICardStore {
  cards: { [key: string]: ICard } | null;
  cardCalculatedPos: number | null;
  actions: ICardActions;
}

const useCardStore = create<ICardStore>()(
  devtools(set => ({
    cards: null,
    cardCalculatedPos: null,
    actions: {
      setCards: cards => set({ cards }, undefined, 'setCards'),
    },
  })),
);

export const useCardActions = () => useCardStore(state => state.actions);
export const useCard = (id: string) =>
  useCardStore(state => (state.cards ? state.cards[id] : null));
export const useSortedCardsByListId = (listId: string) =>
  useCardStore(state => getMemoizedCards(state, listId));
const selectCards = (state: ICardStore) => state.cards;
const selectListId = (_: ICardStore, listId: string) => listId;
const getMemoizedCards = createSelector(
  [selectCards, selectListId],
  (cards: { [key: string]: ICard } | null, listId: string) => {
    if (!cards || !listId) {
      return null;
    }
    const result = Object.keys(cards)
      .filter(key => cards[key].listId === listId)
      .sort((a: string, b: string): number => {
        if (cards) {
          if (cards[a].pos < cards[b].pos) return -1;
          if (cards[a].pos > cards[b].pos) return 1;
        }
        return 0;
      });
    return result;
  },
);
