import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { useAuthActions } from '../services/auth-store';
import { debugLog } from '../utils/debug';
import { ROUTES } from '../utils/router-paths';

type TCustomErrorResponse = {
  message: string;
  options?: { [key: string]: boolean };
  stack?: string;
  status: number;
  success: boolean;
};

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthActions();
  const interceptorId = useRef<number | null>(null);

  useEffect(() => {
    interceptorId.current = axios.interceptors.response.use(
      res => {
        const { data } = res;
        // Handle success cases
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
          navigate(ROUTES.LOGIN);
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
              navigate(ROUTES.ERROR, { state: { message: data.message } });
              break;
            case 401:
              // Unauthorized - clear auth state and redirect to login
              if (!data?.options) {
                toast.error(
                  data?.message || 'Session expired. Please login again',
                );
                clearAuth();
                navigate(ROUTES.LOGIN);
              }
              break;
            case 403:
              toast.error(data?.message || `Access denied`);
              navigate(ROUTES.LOGIN);
              break;
            case 404:
              navigate(ROUTES.NOT_FOUND);
              break;
            case 409:
              toast.error(data?.message || 'Conflict detected');
              break;
            case 500:
              navigate(ROUTES.ERROR, {
                state: { message: 'Server error ocurred' },
              });
              break;
            case 422:
              toast.error(data?.message || 'Validation failed');
              break;
            default:
              if (process.env.NODE_ENV === 'development') {
                toast.error(`Unhandled error: ${data?.message}`);
              }
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
  }, [navigate, clearAuth]);
};
