import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelector } from 'reselect';
import { ICard } from '../utils/types';


interface ICardActions {
  setCards: (data: {[kay: string]: ICard}) => void;
}

// const initialState: TState = {
//   _id: '',
//   name: '',
//   description: '',
//   checkLists: [],
// };

interface ICardStore {
  cards: {[key:string]: ICard} | null;
  cardCalculatedPos: number | null;
  actions: ICardActions
}

const useCardStore = create<ICardStore>()(
  devtools(set=> ({
    cards: null,
    cardCalculatedPos: null,
    actions:{
      setCards: (cards)=> set({cards}, undefined, 'setCards')
    }
  }))
)

export const useCardActions = () => useCardStore((state)=> state.actions)
export const useCard = (id: string) => useCardStore((state)=> state.cards? state.cards[id]: null )
export const useSortedCardsByListId = (listId: string) => useCardStore(getMemoizedCards(listId))

const getMemoizedCards = createSelector(
    (state) => state.cards, 
    (state, listId) => listId, 
    (cards, listId) => {
    if(!cards || !listId){
      return null
    }
    const result = Object.keys(cards).filter(key => cards[key].listId === listId)
      .sort((a: string, b: string): number => {
          if(lists){
            if (cards[a].pos < cards[b].pos) return -1;
            if (cards[a].pos > cards[b].pos) return 1;
          }
          return 0;
        }) 
    console.log(result)
    return result     
  }
)



// export const useCardStore = create<TState & IActions>()(
//   devtools(
//     set => ({
//       ...initialState,
//       setCardState: data =>
//         set({
//           _id: data._id,
//           name: data.name,
//           description: data.description,
//           checkLists: data.checkLists,
//         }),
//       reset: () => set(initialState),
//     }),
//     { name: 'cardState' },
//   ),
// );
