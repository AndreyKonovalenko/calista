import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TO_LOGIN } from '../../utils/route-constants';

import { useUserStore } from '../../services/user/user-store';

// import LoadingBage from '../loading-bage/loading-bage';

type TProps = {
  element: JSX.Element;
};

// const useUser = () => {
//   return useQuery({
//     queryKey: ['user'],
//     queryFn: api.auth.fetchUser,
//   });
// };

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(TO_LOGIN, { state: { from: pathname }, replace: true });
    }
  }, [navigate, pathname, user]);

  // if (loading) {
  //   return (<LoadingBage/>);
  // }

  return user ? element : <></>;
};

export default ProtectedRoute;
