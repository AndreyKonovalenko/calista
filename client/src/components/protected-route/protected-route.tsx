import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TO_LOGIN } from '../../utils/route-constants';
import {useAuthStore } from '../../services/auth/auth-store';
import { useQuery} from '@tanstack/react-query';
import api from '../../utils/calista-api';
// import LoadingBage from '../loading-bage/loading-bage';

type TProps = {
  element: JSX.Element;
};

const useUser = (isAuth:boolean) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: api.auth.fetchUser,
    enabled: !isAuth,
    retry: false
  });
};

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const {setAuthStatus, isAuth} = useAuthStore(state => state);
  const {data, isPending, isSuccess} = useUser(isAuth);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect(() =>{
  //   if(!user && data){
  //     setUser(data)
  //   }
  // },[user,data])

  useEffect(() => {
    console.log(data,  isSuccess,isPending)
    if (!isAuth) {
      console.log('to login')
      navigate(TO_LOGIN, { state: { from: pathname }, replace: true });
     }
  }, [navigate, pathname, setAuthStatus, isAuth]);

  // if(!isFetched && !user) {
  //   return <h1>LOADING</h1>;
  // }
  return isAuth? element : <h1>LOADING</h1>
};

export default ProtectedRoute;
