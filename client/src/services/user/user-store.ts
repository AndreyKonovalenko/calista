import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TUser = {
  _id: string;
  username: string;
};
type TUserState = {
  user: TUser | null;
};

type Actions = {
  setUser: (user: TUser) => void;
  reset: () => void;
};
const initialState: TUserState = {
  user: null,
};

export const useUserStore = create<TUserState & Actions>()(
  devtools(
    set => ({
      ...initialState,
      setUser: (user: TUser) => set({ user }),
      reset: () => set(initialState),
    }),
    { name: 'userStore' },
  ),
);
