import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TStats = {
  [key: string]: {
    checklistItems: {
      quantity: number;
      complete: number;
    };
  };
};

interface IStatsActinos {
  setStats: (data: TStats) => void;
  updateChecklistItemsStats: (
    cradId: string,
    quantity: number,
    complete: number,
  ) => void;
}

interface IStatsStore {
  stats: TStats;
  actions: IStatsActinos;
}

const useStatsStore = create<IStatsStore>()(
  devtools(
    set => ({
      stats: {},
      actions: {
        setStats: stats => set({ stats }, undefined, 'setStats'),
        updateChecklistItemsStats: (cardId, quantity, complete) =>
          set(
            state => ({
              stats: {
                ...state.stats,
                [cardId]: {
                  ...state.stats[cardId],
                  checklistItems: {
                    ...state.stats[cardId].checklistItems,
                    quantity: quantity,
                    complete: complete,
                  },
                },
              },
            }),
            undefined,
            'updateChecklistItemsStats',
          ),
      },
    }),
    { name: 'statsState' },
  ),
);

export const useStats = () => useStatsStore(state => state.stats);
export const useStatsActions = () => useStatsStore(state => state.actions);
export const useGetStatsByCardId = (cardId: string) =>
  useStatsStore(state =>
    Object.keys(state.stats).length > 0 ? state.stats[cardId] : null,
  );
