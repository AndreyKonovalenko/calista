import { useMutation, useQuery } from '@tanstack/react-query';
import api from './api';

export const useLogin = () => {
  return useMutation({
    mutationFn: api.auth.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: api.auth.register,
  });
};

export const useFetchUser = (isAuth: boolean) => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: api.auth.fetchUser,
    enabled: !isAuth,
    retry: false,
  });
};

export const useVerifyEmail = (token: string) => {
  return useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => api.auth.verifyEmail(token),
    enabled: !!token,
  });
};
