import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUIActions {
  setNewItemAdded: (condition: boolean) => void;

}
interface IUIState {
  isNewItemAdded: boolean;
  actions: IUIActions
}

const useUIStore = create<IUIState>()(
  devtools(set=> ({
    isNewItemAdded: false,
    actions:{
      setNewItemAdded:(condition: boolean) => set({isNewItemAdded: condition}, undefined, "setNewItemAdded")
    }
  }),{
    name: 'uiStore'
  }
),
);

export const useUIAction = () => useUIStore(state=> state.actions)
export const useIsNewItemAdded = () => useUIStore(state => state.isNewItemAdded)