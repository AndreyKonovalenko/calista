// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

export type TBoard = {
  _id: string;
  name: string;
  createrId: string;
  lists: Array<string>;
};

// type TBaordsState = {
// 	boards: Array<TBoard> | null;

// }

// type Actions = {
//   setUser: (user: TUser) => void,
//   reset: () => void
// }
// const initialState: TBoardsState = {
//   boards: null
// }

// export const useBoardsStore = create<TUserState & Actions>()(
// 	devtools(
// 		(set) => ({ ...initialState,
// 			setUser: (user: TUser) => set({ user }),
//       reset: () => set(initialState)
// 		}),
// 		{ name: 'userStore' }
// 	)
// );
