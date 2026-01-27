import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TAuthState = {
  _id: string;
  isAuth: boolean;
  username: string;
  email: string;
  actions: IAuthActions;
};

type IAuthActions = {
  setAuthStatus: (data: {
    _id: string;
    isAuth: boolean;
    username: string;
    email: string;
  }) => void;
};

const useAuthStore = create<TAuthState>()(
  devtools(
    set => ({
      _id: '',
      isAuth: false,
      username: '',
      email: '',
      actions: {
        setAuthStatus: (data: {
          _id: string;
          isAuth: boolean;
          username: string;
          email: string;
        }) =>
          set({
            _id: data._id,
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
export const useUserId = () => useAuthStore(state => state._id);
export const useEmail = () => useAuthStore(state => state.email);
export const useIsAuth = () => useAuthStore(state => state.isAuth);
