import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { ICard } from '../utils/types';

interface ICardActions {
  setCards: (data: { [kay: string]: ICard }) => void;
  moveCard: (draggedId: string, listId: string, pos: number) => void;
  setCardCalculatedPos: (pos: number | null) => void;
}

interface ICardStore {
  cards: { [key: string]: ICard };
  cardCalculatedPos: number | null;
  actions: ICardActions;
}

const useCardStore = create<ICardStore>()(
  devtools(
    set => ({
      cards: {},
      cardCalculatedPos: null,
      actions: {
        setCards: cards => set({ cards }, undefined, 'setCards'),
        setCardCalculatedPos: (pos: number | null) =>
          set({ cardCalculatedPos: pos }, undefined, 'setCardCalculatedPos'),
        moveCard: (draggedId, listId, pos) =>
          set(
            state => ({
              cards: {
                ...state.cards,
                [draggedId]: {
                  ...state.cards[draggedId],
                  listId: listId,
                  pos: pos,
                },
              },
            }),
            undefined,
            'moveCard',
          ),
      },
    }),
    { name: 'cardStore' },
  ),
);

export const useCardActions = () => useCardStore(state => state.actions);
export const useCardCalculatedPos = () =>
  useCardStore(state => state.cardCalculatedPos);
export const useCards = () => useCardStore(state => state.cards);
export const useCard = (id: string) =>
  useCardStore(state => (state.cards ? state.cards[id] : null));
export const useSortedCardsByListId = (listId: string) =>
  useCardStore(state => getMemoizedCards(state, listId));
const selectCards = (state: ICardStore) => state.cards;
const selectListId = (_: ICardStore, listId: string) => listId;
const getMemoizedCards = createSelector(
  [selectCards, selectListId],
  (cards: { [key: string]: ICard }, listId: string) => {
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
