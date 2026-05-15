import { useMemo } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TAuthState = {
  _id: string;
  username: string;
  email: string;
};

type TAuthActions = {
  setAuthStatus: (data: {
    _id: string;
    username: string;
    email: string;
  }) => void;
  clearAuth: () => void;
};

const useAuthStore = create<TAuthState & { actions: TAuthActions }>()(
  devtools(
    set => ({
      _id: '',
      isAuth: false,
      username: '',
      email: '',
      actions: {
        setAuthStatus: (data: {
          _id: string;
          username: string;
          email: string;
        }) =>
          set({
            _id: data._id,
            username: data.username,
            email: data.email,
          }),
        clearAuth: () =>
          set({
            _id: '',
            username: '',
            email: '',
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

export const useIsAuth = () => {
  const userId = useUserId();
  return !!userId;
};

export const useUserData = () => {
  const _id = useUserId();
  const username = useUsername();
  const email = useEmail();
  return useMemo(() => {
    if (!_id) return null;
    return { _id, username, email };
  }, [_id, username, email]);
};
