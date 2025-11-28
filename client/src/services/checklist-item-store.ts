import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { IChecklistItem } from '../utils/types';

interface IChecklistItemActions {
  setChecklistItems: (data: { [key: string]: IChecklistItem }) => void;
  updateChecklistItemName: (_id: string, name: string) => void;
  setChecklistItemCalculatedPos: (pos: number | null) => void;
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
export const useGetChecklistItemsStateStatByCardId = (cardId: string) => {
  useChecklistItemStore(state =>
    getMemoizedChecklistItemsByCardId(state, cardId),
  );
};

export const useSortedChecklistItemsByChecklistId = (checklistId: string) =>
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

const cardId = (_: IChecklistItemStore, cardId: string) => cardId;
const getMemoizedChecklistItemsByCardId = createSelector(
  [selectChecklistItems, cardId],
  (checklistItems: { [key: string]: IChecklistItem }, cardId: string) => {
    const result = Object.keys(checklistItems).filter(
      key => checklistItems[key].cardId === cardId,
    );
    return result;
  },
);
