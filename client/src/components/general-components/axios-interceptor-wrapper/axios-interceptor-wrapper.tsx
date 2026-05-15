import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import {
  TO_ERROR_PAGE,
  TO_LOGIN,
  TO_NOT_FOUND,
} from '../../../utils/route-constants';
import { debugLog } from '../../../utils/debug';

type TCustomErrorResponse = {
  message: string;
  options?: { [key: string]: boolean };
  stack?: string;
  status: number;
  success: boolean;
};

const AxiosInterceptorWrapper = () => {
  const navigate = useNavigate();
  const interceptorId = useRef<number | null>(null);

  useEffect(() => {
    interceptorId.current = axios.interceptors.response.use(
      res => {
        const { data } = res;
        switch (data.message) {
          case 'Board not found':
            toast.error(data.message);
            break;
          case 'Card not found':
            toast.error(data.message);
            break;
        }
        if (data.userCreated) {
          toast.success(data.message, { autoClose: false });
          navigate(TO_LOGIN);
        }
        if (data.pendingEmail) {
          toast.success(data.message, { autoClose: false });
        }
        return res;
      },
      (error: AxiosError<TCustomErrorResponse>) => {
        if (error.response) {
          const { data, status } = error.response;
          switch (status) {
            case 400:
              navigate(TO_ERROR_PAGE, { state: { message: data.message } });
              break;
            case 401:
              if (!data.options) {
                toast.error(data.message);
                navigate(TO_LOGIN);
              }
              break;
            case 403:
              toast.error(data.message);
              navigate(TO_LOGIN);
              break;
            case 404:
              navigate(TO_NOT_FOUND);
              break;
            case 409:
              toast.error(data.message);
              break;
            case 500:
              navigate(TO_ERROR_PAGE, {
                state: { message: 'Server error ocurred' },
              });
              break;
            case 422:
              toast.error(data.message);
              break;
            // default:
            //   toast.error(data.message);
          }
        } else if (error.request) {
          debugLog('axios-interceptor-wrapper', { error: error.message });
          toast.error('No respose recived from server');
        } else {
          debugLog('axios-interceptor-wrapper', { error: error.message });
          toast.error(`Error during requeset setup', ${error.message}`);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      if (interceptorId.current)
        axios.interceptors.response.eject(interceptorId.current);
    };
  }, [navigate]);
  return null;
};

export default AxiosInterceptorWrapper;
