import { create } from 'zustand';
import { useMemo } from 'react';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createSelector } from 'reselect';
import { ICard } from '../utils/types';
import { produce } from 'immer';
// import { useCallback } from 'react';

interface ICardActions {
  setCards: (data: Record<string, ICard>) => void;
  moveCard: (draggedId: string, listId: string, pos: number) => void;
  setCardCalculatedPos: (pos: number | null) => void;
  updateCardDescription: (_id: string, description: string) => void;
  updateCardName: (_id: string, name: string) => void;
  clearCards: () => void;
}

interface ICardStore {
  cards: Record<string, ICard>;
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
        updateCardDescription: (_id, description) =>
          set(state => {
            if (!state.cards[_id]) {
              console.warn(`Card ${_id} not found`);
              return state;
            }
            return {
              cards: {
                ...state.cards,
                [_id]: {
                  ...state.cards[_id],
                  description: description,
                },
              },
            };
          }),
        updateCardName: (_id, name) =>
          set(state => ({
            cards: {
              ...state.cards,
              [_id]: {
                ...state.cards[_id],
                name: name,
              },
            },
          })),
        moveCard: (draggedId, listId, pos) =>
          set(
            produce(state => {
              state.cards[draggedId].listId = listId;
              state.cards[draggedId].pos = pos;
            }),
            undefined,
            'moveCard',
          ),
        clearCards: () =>
          set({
            cards: {},
            cardCalculatedPos: null,
          }),
      },
    }),
    { name: 'cardStore' },
  ),
);

export const useCardActions = () => useCardStore(state => state.actions);
export const useCardCalculatedPos = () =>
  useCardStore(state => state.cardCalculatedPos);
export const useCards = () => useCardStore(state => state.cards);

// export const useCard = (id: string | undefined) => {
//   const selector = useCallback(
//     (state: ICardStore) => {
//       if (!id) return null;
//       return state.cards[id] ?? null;
//     },
//     [id],
//   );
//   return useCardStore(selector);
// };

export const useCard = (id: string | undefined) => {
  return useCardStore(
    useShallow(state => (id ? (state.cards[id] ?? null) : null)),
  );
};

// export const useSortedCardsByListId = (listId: string) =>
//   useCardStore(state => getMemoizedCards(state, listId));

export const useSortedCardsByListId = (listId: string) => {
  const selector = useMemo(
    () => (state: ICardStore) => getMemoizedCards(state, listId),
    [listId],
  );
  return useCardStore(useShallow(selector));
};

const selectCards = (state: ICardStore) => state.cards;
const selectListId = (_: ICardStore, listId: string) => listId;

const getMemoizedCards = createSelector(
  [selectCards, selectListId],
  (cards: Record<string, ICard>, listId: string) => {
    return Object.keys(cards)
      .filter(key => cards[key].listId === listId)
      .sort((a, b) => cards[a].pos - cards[b].pos);
  },
);
