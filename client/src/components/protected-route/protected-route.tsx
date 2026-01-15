import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useAuthActions, useIsAuth } from '../../services/auth-store';
import LoadingBage from '../loading-bage/loading-bage';
import { useFetchUser } from '../../api/auth-api-queries';

type TProps = {
  element: JSX.Element;
};

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const { setAuthStatus } = useAuthActions();
  const isAuth = useIsAuth();
  const { data, isPending, isSuccess } = useFetchUser(isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('fetch from protected route')
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
