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

export const useFetchUser = (enabled: boolean) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: api.auth.fetchUser,
    enabled,
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

export const useVerifyPendingEmail = (token: string) => {
  return useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => api.auth.verifyPendingEmail(token),
    enabled: !!token,
  });
};

export const useResendLink = () => {
  return useMutation({
    mutationFn: api.auth.resendLink,
  });
};

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: api.auth.updateEmail,
  });
};
