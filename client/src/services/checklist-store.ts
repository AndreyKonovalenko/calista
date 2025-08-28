import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { IChecklist, IChecklistItem } from '../utils/types';

interface IChecklistActions {
  setChecklists: (data: { [key: string]: IChecklist }) => void;
  setChecklistItems: (data: { [key: string]: IChecklistItem }) => void;
  updateChecklistName: (_id: string, name: string) => void;
  // moveCard: (draggedId: string, listId: string, pos: number) => void;
  // setCardCalculatedPos: (pos: number | null) => void;
  // updateCardDescription: (_id: string, description: string) => void;
  // updateCardName: (_id: string, name: string) => void;
}

interface IChecklistStore {
  checklists: { [key: string]: IChecklist };
  checklistItems: { [key: string]: IChecklistItem };
  itemCalculatedPos: number | null;
  actions: IChecklistActions;
}

const useCardStore = create<IChecklistStore>()(
  devtools(
    set => ({
      checklists: {},
      checklistItems: {},
      itemCalculatedPos: null,
      actions: {
        setChecklists: checklists =>
          set({ checklists }, undefined, 'setChecklists'),
        setChecklistItems: checklistItems =>
          set({ checklistItems }, undefined, 'setChecklistItems'),
      },
    }),
    { name: 'cardStore' },
  ),
);

// const useCardStore = create<IChecklistActions>()(
//   devtools(
//     set => ({
//       checklists: {},
//       checklistItems: {}
//       itemCalculatedPos: null,
//       actions: {
//         setChecklists: checklists => set({ checklists }, undefined, 'setCards'),
//         setCardCalculatedPos: (pos: number | null) =>
//           set({ cardCalculatedPos: pos }, undefined, 'setCardCalculatedPos'),
//         updateCardDescription: (_id, description) =>
//           set(state => ({
//             cards: {
//               ...state.cards,
//               [_id]: {
//                 ...state.cards[_id],
//                 description: description,
//               },
//             },
//           })),
//         updateCardName: (_id, name) =>
//           set(state => ({
//             cards: {
//               ...state.cards,
//               [_id]: {
//                 ...state.cards[_id],
//                 name: name,
//               },
//             },
//           })),
//         moveCard: (draggedId, listId, pos) =>
//           set(
//             state => ({
//               cards: {
//                 ...state.cards,
//                 [draggedId]: {
//                   ...state.cards[draggedId],
//                   listId: listId,
//                   pos: pos,
//                 },
//               },
//             }),
//             undefined,
//             'moveCard',
//           ),
//       },
//     }),
//     { name: 'cardStore' },
//   ),
// );

export const useCardActions = () => useCardStore(state => state.actions);
export const useCardCalculatedPos = () =>
  useCardStore(state => state.cardCalculatedPos);
export const useCards = () => useCardStore(state => state.cards);
export const useCard = (id: string | undefined) => {
  if (!id) return null;
  return useCardStore(state => (state.cards ? state.cards[id] : null));
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
