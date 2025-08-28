import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TUIState = {
  addChecklist: boolean;
  actions: IUIActions;
};

type IUIActions = {
  setAddChecklist: () => void;
};

const useUIStore = create<TUIState>()(
  devtools(
    set=> ({
      addChecklist: false,
      actions: {
        setAddChecklist: () => set(state=> ({
          addChecklist: !state.addChecklist,
        })
        )
      }
    }),
    { name: 'UIStore' },
  ),
);

export const useAddChecklist =() => useUIStore(state => state.addChecklist)
export const useUIActions = ()=>  useUIStore(state => state.actions)