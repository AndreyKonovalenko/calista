import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { IChecklist } from '../utils/types';

interface IChecklistActions {
  setChecklists: (data: { [key: string]: IChecklist }) => void;
  updateChecklistName: (_id: string, name: string) => void;
  deleteChecklist: (_id: string) => void;
  clearChecklists: () => void;
}

interface IChecklistStore {
  checklists: Record<string, IChecklist>;
  actions: IChecklistActions;
}

const useChecklistStore = create<IChecklistStore>()(
  devtools(
    set => ({
      checklists: {},
      actions: {
        setChecklists: checklists =>
          set({ checklists }, undefined, 'setChecklist'),
        deleteChecklist: _id =>
          set(
            state => {
              const { [_id]: _, ...rest } = state.checklists;
              return { checklists: rest };
            },
            undefined,
            'deleteChecklist',
          ),
        updateChecklistName: (_id, name) =>
          set(
            state => ({
              checklists: {
                ...state.checklists,
                [_id]: {
                  ...state.checklists[_id],
                  name: name,
                },
              },
            }),
            undefined,
            'updateChecklistName',
          ),
        clearChecklists: () =>
          set({
            checklists: {},
          }),
      },
    }),
    { name: 'checklistStore' },
  ),
);

export const useChecklists = () => useChecklistStore(state => state.checklists);
export const useChecklistActions = () =>
  useChecklistStore(state => state.actions);
export const useChecklist = (id: string | undefined) => {
  if (!id) return null;
  return useChecklistStore(state =>
    state.checklists ? state.checklists[id] : null,
  );
};
export const useSortedChecklistsKeys = (cardId: string) =>
  useChecklistStore(state => getMemoizedChecklists(state, cardId));

const selectChecklists = (state: IChecklistStore) => state.checklists;

const selectCardId = (_: IChecklistStore, selectCardId: string) => selectCardId;

const getMemoizedChecklists = createSelector(
  [selectChecklists, selectCardId],
  (checklists: { [key: string]: IChecklist }, cardId: string) => {
    const result = Object.keys(checklists)
      .filter(key => checklists[key].cardId === cardId)
      .sort((a: string, b: string): number => {
        if (checklists) {
          if (checklists[a].pos < checklists[b].pos) return -1;
          if (checklists[a].pos > checklists[b].pos) return 1;
        }
        return 0;
      });
    return result;
  },
);
