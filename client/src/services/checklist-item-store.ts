import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createSelector } from 'reselect';
import { IChecklistItem } from '../utils/types';
import { useCallback } from 'react';

interface IChecklistItemActions {
  setChecklistItems: (data: { [key: string]: IChecklistItem }) => void;
  updateChecklistItemName: (_id: string, name: string) => void;
  setChecklistItemCalculatedPos: (pos: number | null) => void;
  deleteChecklistItem: (_id: string) => void;
  updateChecklistItemState: (
    _id: string,
    state: 'incomplete' | 'complete',
  ) => void;
  moveChecklistItem: (
    draggedId: string,
    checklistId: string,
    pos: number,
  ) => void;
  clearChecklistItems: () => void;
}

interface IChecklistItemStore {
  checklistItems: Record<string, IChecklistItem>;
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
        moveChecklistItem: (draggedId, checklistId, pos) =>
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
        clearChecklistItems: () =>
          set({
            checklistItems: {},
            checklistItemCalculatedPos: null,
          }),
      },
    }),
    { name: 'checklistItemStore' },
  ),
);

export const useChecklistItems = () =>
  useChecklistItemStore(useShallow(state => state.checklistItems));

export const useChecklistItemActions = () =>
  useChecklistItemStore(state => state.actions);

export const useChecklistItemsCalculatedPos = () =>
  useChecklistItemStore(state => state.checklistItemCalculatedPos);

export const useChecklistItem = (id: string | undefined) => {
  const selector = useCallback(
    (state: IChecklistItemStore) => {
      if (!id) return null;
      return state.checklistItems[id] ?? null;
    },
    [id],
  );
  return useChecklistItemStore(useShallow(selector));
};

export const useSortedChecklistItemsKeys = (checklistId: string) =>
  useChecklistItemStore(
    useShallow(state => getMemoizedSortedChecklistItems(state, checklistId)),
  );

const selectChecklistId = (_: IChecklistItemStore, checklistId: string) =>
  checklistId;
const selectChecklistItems = (state: IChecklistItemStore) =>
  state.checklistItems;

const getMemoizedSortedChecklistItems = createSelector(
  [selectChecklistItems, selectChecklistId],
  (checklistItems: Record<string, IChecklistItem>, checklistId: string) => {
    return Object.keys(checklistItems)
      .filter(key => checklistItems[key].checklistId === checklistId)
      .sort(
        (a: string, b: string) => checklistItems[a].pos - checklistItems[b].pos,
      );
  },
);

const selectCardId = (_: IChecklistItemStore, cardId: string) => cardId;

const getMemoizedChecklistItems = createSelector(
  [selectChecklistItems, selectCardId],
  (checklistItems: Record<string, IChecklistItem>, cardId: string) => {
    const items = Object.values(checklistItems).filter(
      item => item.cardId === cardId,
    );
    return {
      quantity: items.length,
      complete: items.filter(item => item.state === 'complete').length,
    };
  },
);

export const useChecklistsItemsStat = (cardId: string) =>
  useChecklistItemStore(
    useShallow(state => getMemoizedChecklistItems(state, cardId)),
  );
