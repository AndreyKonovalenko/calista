import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IList } from '../utils/types';
import { createSelector } from 'reselect';

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
export const useLists = () => useListStore((state)=>state.lists)
export const useListCalculatedPos = () => useListStore((state)=> state.listCalculatedPos)
export const useSortedLists = () => useListStore(sortingList)
const sortingList = createSelector(
  state => state.lists, 
  lists => {
    if(!lists){
      return null
    }
    const result = Object.keys(lists)
        .sort((a: string, b: string): number => {
          if(lists){
            if (lists[a].pos < lists[b].pos) return -1;
            if (lists[a].pos > lists[b].pos) return 1;
          }
          return 0;
        }) 
    console.log(result)
    return result     
  } 
)

export const useSortedLists2 = () =>  useListStore((state)=> {
    const lists = state.lists
    if(!lists){
      return null
    }
    const result = Object.keys(lists)
        .sort((a: string, b: string): number => {
          if(lists){
            if (lists[a].pos < lists[b].pos) return -1;
            if (lists[a].pos > lists[b].pos) return 1;
          }
          return 0;
        }) 
    console.log(result)
    return result;
})