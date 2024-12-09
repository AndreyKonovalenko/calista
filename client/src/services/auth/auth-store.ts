import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TAuthState = {
  isAuth: boolean
};

type Actions = {
  setAuthStatus: (isAuth: boolean) => void;
  reset: () => void;
};

const initialState: TAuthState = {
  isAuth: false,
};

export const useAuthStore = create<TAuthState & Actions>()(
  devtools(
    set => ({
      ...initialState,
      setAuthStatus: (isAuth: boolean) => set({ isAuth }),
      reset: () => {
        set(initialState)
      },
    }),
    { name: 'authStore' },
  ),
);
