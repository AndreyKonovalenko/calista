import React, { useEffect } from 'react';
import { useAuthActions, useUserId } from '../../services/auth-store';
import LoadingBage from '../loading-bage/loading-bage';
import { useFetchUser } from '../../api/auth-api-queries';
import { debugLog } from '../../utils/debug';

type TProps = {
  element: JSX.Element;
};

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const { setAuthState } = useAuthActions();
  const userId = useUserId();
  const { data, isPending, isSuccess } = useFetchUser(!userId);

  debugLog('ProtectedRoute', { data, isPending, isSuccess });
  useEffect(() => {
    if (data && !userId) {
      setAuthState({
        _id: data._id,
        username: data.username,
        email: data.email,
      });
    }
  }, [data, userId, setAuthState]);

  if (!userId && isPending) return <LoadingBage />;
  return element;
};

export default ProtectedRoute;
