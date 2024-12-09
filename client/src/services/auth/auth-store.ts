import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TAuthState = {
  isAuth: boolean,
  username: string
};

type Actions = {
  setAuthStatus: (state: TAuthState) => void;
  reset: () => void;
};

const initialState: TAuthState = {
  isAuth: false,
  username: "" 
};

export const useAuthStore = create<TAuthState & Actions>()(
  devtools(
    set => ({
      ...initialState,
      setAuthStatus: (data: TAuthState) => set({
        isAuth: data.isAuth,
        username: data.username
        }),
      reset: () => {
        set(initialState)
      },
    }),
    { name: 'authStore' },
  ),
);
