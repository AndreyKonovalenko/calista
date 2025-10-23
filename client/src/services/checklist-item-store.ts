import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { IChecklistItem } from '../utils/types';

interface IChecklistItemActions {
  setChecklistItems: (data: { [key: string]: IChecklistItem }) => void;
  updateChecklistItemName: (_id: string, name: string) => void;
  setSetChecklistItemCalculatedPos: (pos: number | null) => void;
  // moveCard: (draggedId: string, listId: string, pos: number) => void;
  // updateCardDescription: (_id: string, description: string) => void;
  // updateCardName: (_id: string, name: string) => void;
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
        setSetChecklistItemCalculatedPos: (pos: number | null) =>
          set(
            { checklistItemCalculatedPos: pos },
            undefined,
            'setChecklistItemCalculatedPos',
          ),
      },
    }),
    { name: 'checklistItemStore' },
  ),
);

export const useChecklistItems = () =>
  useChecklistItemStore(state => state.checklistItems);
export const useChecklistItemActions = () =>
  useChecklistItemStore(state => state.actions);
export const useChecklistItem = (id: string | undefined) => {
  if (!id) return null;
  return useChecklistItemStore(state => (state.checklistItems ? state.checklistItems[id] : null));
}

export const useSortedChecklistItemsByChecklistId = (checklistId: string) =>
  useChecklistItemStore(state => getMemoizedChecklistItems(state, checklistId));
const selectChecklistId = (_:IChecklistItemStore, checklistId: string )=> checklistId;
const selectChecklistItems = (state: IChecklistItemStore) => state.checklistItems;
const getMemoizedChecklistItems = createSelector(
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
