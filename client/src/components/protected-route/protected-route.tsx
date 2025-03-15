import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useAuthStore } from '../../services/auth/auth-store';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/calista-api';
import LoadingBage from '../loading-bage/loading-bage';

type TProps = {
  element: JSX.Element;
};

const useUser = (isAuth: boolean) => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: api.auth.fetchUser,
    enabled: !isAuth,
    retry: false,
  });
};

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const { setAuthStatus, isAuth } = useAuthStore(state => state);
  const { data, isPending, isSuccess } = useUser(isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending) {
      if (!isAuth && isSuccess) {
        setAuthStatus(data);
      }
      if (!isSuccess && !isAuth) {
        navigate(TO_LOGIN);
      }
    }
  }, [isAuth, data, isSuccess, setAuthStatus, isPending]);

  return isAuth ? element : <LoadingBage />;
};

export default ProtectedRoute;
