import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TAuthState = {
  isAuth: boolean;
  username: string;
  actions: IAuthActions;
};

type IAuthActions = {
  setAuthStatus: (data: { isAuth: boolean; username: string }) => void;
};

const useAuthStore = create<TAuthState>()(
  devtools(
    set => ({
      isAuth: false,
      username: '',
      actions: {
        setAuthStatus: (data: { isAuth: boolean; username: string }) =>
          set({
            isAuth: data.isAuth,
            username: data.username,
          }),
      },
    }),
    { name: 'authStore' },
  ),
);

export const useAuthActions = () => useAuthStore(state => state.actions);
export const useUsername = () => useAuthStore(state => state.username);
export const useIsAuth = () => useAuthStore(state => state.isAuth);
