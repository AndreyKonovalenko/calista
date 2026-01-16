import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TAuthState = {
  isAuth: boolean;
  username: string;
  email: string;
  actions: IAuthActions;
};

type IAuthActions = {
  setAuthStatus: (data: {
    isAuth: boolean;
    username: string;
    email: string;
  }) => void;
};

const useAuthStore = create<TAuthState>()(
  devtools(
    set => ({
      isAuth: false,
      username: '',
      email: '',
      actions: {
        setAuthStatus: (data: {
          isAuth: boolean;
          username: string;
          email: string;
        }) =>
          set({
            isAuth: data.isAuth,
            username: data.username,
            email: data.email,
          }),
      },
    }),
    { name: 'authStore' },
  ),
);

export const useAuthActions = () => useAuthStore(state => state.actions);
export const useUsername = () => useAuthStore(state => state.username);
export const useEmail = () => useAuthStore(state => state.email);
export const useIsAuth = () => useAuthStore(state => state.isAuth);
