import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

type TCustomErrorResponse = {
  message: string;
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
        console.log(data);
        return res;
      },
      (error: AxiosError<TCustomErrorResponse>) => {
        if (error.response) {
          const { data } = error.response!;
          console.log(data.message, data.status);
          if (data.status === 400) {
            navigate('/error-page', { state: { message: data.message } });
          }
          toast.error(data.message);
        } else if (error.request) {
          toast(error.request.status);
        } else {
          toast.error(error.message);
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
