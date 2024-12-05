import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
  const { data } = useUser()  
  const user  = useUserStore(state => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();


  useEffect(() => {
    if (!user) {
      if( data ){
        console.log(data)
        setUser(data)
      } else {
        navigate(TO_LOGIN, { state: { from: pathname }, replace: true });
      }
    }
  }, [navigate, pathname, user, setUser]);

  useEffect(()=>{
    console.log(user)
  }, [user])
  // if (loading) {
  //   return (<LoadingBage/>);
  // }

  return user ? element : <></>;
};

export default ProtectedRoute;
