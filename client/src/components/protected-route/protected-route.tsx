import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TO_LOGIN } from '../../utils/route-constants';
import { useUserStore } from '../../services/user/user-store';
import { useQuery} from '@tanstack/react-query';
import api from '../../utils/calista-api';
// import LoadingBage from '../loading-bage/loading-bage';

type TProps = {
  element: JSX.Element;
};

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: api.auth.fetchUser,
  });
};

const ProtectedRoute = ({ element }: TProps): JSX.Element => {
  const {setUser} = useUserStore();
  const {data, isFetched, isSuccess} = useUser();
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() =>{
    if(!user && data){
      setUser(data)
    }
  },[user,data])

  useEffect(() => {
    console.log(data, isFetched, isSuccess)
    if (!data && !isSuccess) {
      console.log('to login')
      navigate(TO_LOGIN, { state: { from: pathname }, replace: true });
     }
  }, [navigate, pathname, user, setUser]);

  // if(!isFetched && !user) {
  //   return <h1>LOADING</h1>;
  // }
  return user? element : <h1>LOADING</h1>
};

export default ProtectedRoute;
