import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IList } from '../utils/types';

interface IListActions {
  setLists: (data: {[key: string]: IList }) => void;
}

interface IListState {
  lists: {[key: string]: IList} | null;
  listCalculatedPos: number | null;
  actions: IListActions;
}

const useListStore = create<IListState>()(
  devtools(set => ({
    lists: null,
    listCalculatedPos: null,
    actions: {
      setLists: (lists) => set({lists}, undefined, "setLists")
    }
  }),
    {name: 'listStore'} 
  )
)

export const useListActions = () => useListStore((state)=> state.actions);
export const useList = (id: string) => useListStore((state)=> state.lists? state.lists[id]: null)
export const useListCalculatedPos = () => useListStore((state)=> state.listCalculatedPos)
export const useSortedLists = () => useListStore((state)=> {
  if (state.lists) {
    return Object.keys(state.lists)
      .sort((a: string, b: string): number => {
        if(state.lists){
          if (state.lists[a].pos < state.lists[b].pos) return -1;
          if (state.lists[a].pos > state.lists[b].pos) return 1;
        }
        return 0;
      })
  }
   return null;
})