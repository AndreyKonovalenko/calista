import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IList } from '../utils/types';
import { createSelector } from 'reselect';

interface IListActions {
  setLists: (data: { [key: string]: IList }) => void;
  updateListPosByListId: (draggedId: string, pos: number) => void;
  setListCulclulatedPos: (pos: number | null) => void;
  updateListNameBylistId: (id: string, name: string) => void;
}

interface IListState {
  lists: { [key: string]: IList };
  listCalculatedPos: number | null;
  actions: IListActions;
}

const useListStore = create<IListState>()(
  devtools(
    set => ({
      lists: {},
      listCalculatedPos: null,
      actions: {
        setLists: lists => set({ lists }, undefined, 'setLists'),
        updateListPosByListId: (draggedId: string, pos: number) =>
          set(
            state => ({
              lists: {
                ...state.lists,
                [draggedId]: {
                  ...state.lists[draggedId],
                  pos: pos,
                },
              },
            }),
            undefined,
            'updateListPos',
          ),
        setListCulclulatedPos: (pos: number | null) =>
          set({ listCalculatedPos: pos }, undefined, 'setListCalculatedPos'),
        updateListNameBylistId: (_id, name) =>
          set(state => ({
            lists: {
              ...state.lists,
              [_id]: {
                ...state.lists[_id],
                name: name,
              },
            },
          })),
      },
    }),
    { name: 'listStore' },
  ),
);

export const useListActions = () => useListStore(state => state.actions);
export const useList = (id: string) => useListStore(state => state.lists[id]);
export const useLists = () => useListStore(state => state.lists);
export const useListCalculatedPos = () =>
  useListStore(state => state.listCalculatedPos);
export const useSortedLists = () => useListStore(getMemoizedList);
const getMemoizedList = createSelector([state => state.lists], lists => {
  if (!lists) {
    return;
  }
  const sorted = Object.keys(lists).sort((a: string, b: string): number => {
    if (lists) {
      if (lists[a].pos < lists[b].pos) return -1;
      if (lists[a].pos > lists[b].pos) return 1;
    }
    return 0;
  });
  return sorted;
});
