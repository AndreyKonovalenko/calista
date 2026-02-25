import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { ICard } from '../utils/types';
import { useChecklists } from './checklist-store';
import { useChecklistItems } from './checklist-item-store';
import { useSortedChecklistsItemsKeys } from './checklist-item-store';
import { useSortedChecklistsKeys } from './checklist-store';
interface ICardActions {
  setCards: (data: { [kay: string]: ICard }) => void;
  moveCard: (draggedId: string, listId: string, pos: number) => void;
  setCardCalculatedPos: (pos: number | null) => void;
  updateCardDescription: (_id: string, description: string) => void;
  updateCardName: (_id: string, name: string) => void;
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
        updateCardDescription: (_id, description) =>
          set(state => ({
            cards: {
              ...state.cards,
              [_id]: {
                ...state.cards[_id],
                description: description,
              },
            },
          })),
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
export const useCard = (id: string | undefined) => {
  if (!id) return null;
  return useCardStore(state =>
    Object.keys(state.cards).length > 0 ? state.cards[id] : null,
  );
};

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

export const usePopulateCard = (id: string ) => {
  const card =  useCard(id)
  const checklists = useChecklists()
  const checklistItems = useChecklistItems()
  const sortedChecklistsByCardId = useSortedChecklistsKeys(id)
  const  checklistsByCardId =  sortedChecklistsByCardId.map(checkistId => {
    const sortedChecklistItems = useSortedChecklistsItemsKeys(checkistId)
    const checlistItemsByChecklistId = sortedChecklistItems.map(checklistItemId => {
      return { "name": checklistItems[checklistItemId].name} 
    })
    return {"name": checklists[checkistId].name,
      "checlistItems": checlistItemsByChecklistId
    }
  })
  return {
    'name': card?.name,
    "description": card?.description,
    "checklists": checklistsByCardId
  }
}