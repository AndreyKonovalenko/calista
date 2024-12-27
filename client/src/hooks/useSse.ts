import { useEffect } from 'react';
import api from '../utils/calista-api';

const useSse = () => {
  useEffect(() => {
    const eventSource = api.sse.setConnection();
    eventSource.onopen = event =>
      console.log('>>> Connection open', eventSource.readyState, event);
    eventSource.onerror = err => console.log('Error', err);
    eventSource.onmessage = event => {
      const stockData = JSON.parse(event.data);
      console.log(stockData);
    };
    eventSource.addEventListener('close', () => {
      eventSource.close();
    });
    return () => {
      eventSource.close();
      console.log('connection canciled', eventSource.readyState);
    };
  }, []);
};
export default useSse;
