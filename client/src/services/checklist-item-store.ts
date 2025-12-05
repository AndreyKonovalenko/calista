import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { IChecklistItem } from '../utils/types';

interface IChecklistItemActions {
  setChecklistItems: (data: { [key: string]: IChecklistItem }) => void;
  updateChecklistItemName: (_id: string, name: string) => void;
  setChecklistItemCalculatedPos: (pos: number | null) => void;
  deleteChecklistItem: (_id: string) => void;
  updateChecklistItemState: (
    _id: string,
    state: 'incomplete' | 'complete',
  ) => void;
  moveChecklistIetem: (
    draggedId: string,
    checklistId: string,
    pos: number,
  ) => void;
}

interface IChecklistItemStore {
  checklistItems: { [key: string]: IChecklistItem };
  checklistItemCalculatedPos: number | null;
  actions: IChecklistItemActions;
}

const useChecklistItemStore = create<IChecklistItemStore>()(
  devtools(
    set => ({
      checklistItems: {},
      checklistItemCalculatedPos: null,
      actions: {
        setChecklistItems: checklistItems =>
          set({ checklistItems }, undefined, 'setChecklistItem'),
        updateChecklistItemName: (_id, name) =>
          set(
            state => ({
              checklistItems: {
                ...state.checklistItems,
                [_id]: {
                  ...state.checklistItems[_id],
                  name: name,
                },
              },
            }),
            undefined,
            'updateChecklistItemName',
          ),
        updateChecklistItemState: (_id, itemState) =>
          set(
            state => ({
              checklistItems: {
                ...state.checklistItems,
                [_id]: {
                  ...state.checklistItems[_id],
                  state: itemState,
                },
              },
            }),
            undefined,
            'updateChecklistItemState',
          ),
        deleteChecklistItem: _id =>
          set(
            state => {
              const { [_id]: _, ...rest } = state.checklistItems;
              return { checklistItems: rest };
            },
            undefined,
            'deleteChecklistItem',
          ),
        setChecklistItemCalculatedPos: (pos: number | null) =>
          set(
            { checklistItemCalculatedPos: pos },
            undefined,
            'setChecklistItemCalculatedPos',
          ),
        moveChecklistIetem: (draggedId, checklistId, pos) =>
          set(state => ({
            checklistItems: {
              ...state.checklistItems,
              [draggedId]: {
                ...state.checklistItems[draggedId],
                checklistId: checklistId,
                pos: pos,
              },
            },
          })),
      },
    }),
    { name: 'checklistItemStore' },
  ),
);

export const useChecklistItems = () =>
  useChecklistItemStore(state => state.checklistItems);
export const useChecklistItemActions = () =>
  useChecklistItemStore(state => state.actions);
export const useChecklistItemsCalclulatedPos = () =>
  useChecklistItemStore(state => state.checklistItemCalculatedPos);
export const useChecklistItem = (id: string | undefined) => {
  if (!id) return null;
  return useChecklistItemStore(state =>
    state.checklistItems ? state.checklistItems[id] : null,
  );
};

export const useSortedChecklistsItemsKeys = (checklistId: string) =>
  useChecklistItemStore(state =>
    getMemoizedSortedChecklistItems(state, checklistId),
  );
const selectChecklistId = (_: IChecklistItemStore, checklistId: string) =>
  checklistId;
const selectChecklistItems = (state: IChecklistItemStore) =>
  state.checklistItems;
const getMemoizedSortedChecklistItems = createSelector(
  [selectChecklistItems, selectChecklistId],
  (checklistItems: { [key: string]: IChecklistItem }, checklistId: string) => {
    const result = Object.keys(checklistItems)
      .filter(key => checklistItems[key].checklistId === checklistId)
      .sort((a: string, b: string): number => {
        if (checklistItems) {
          if (checklistItems[a].pos < checklistItems[b].pos) return -1;
          if (checklistItems[a].pos > checklistItems[b].pos) return 1;
        }
        return 0;
      });

    return result;
  },
);

const selectCardId = (_: IChecklistItemStore, cardId: string) => cardId;
const getMemoizedChecklistItems = createSelector(
  [selectChecklistItems, selectCardId],
  (checklistItems: { [key: string]: IChecklistItem }, cardId: string) => {
    let quantity = 0;
    let complete = 0;
    Object.keys(checklistItems).forEach(element => {
      if (checklistItems[element].cardId === cardId) {
        quantity = quantity + 1;
        if (checklistItems[element].state === 'complete') {
          complete = complete + 1;
        }
      }
    });
    return { quantity, complete };
  },
);

export const useChecklistsItemsStat = (cardId: string) =>
  useChecklistItemStore(state => getMemoizedChecklistItems(state, cardId));
