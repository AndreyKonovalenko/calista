import { useMutation } from '@tanstack/react-query';
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
