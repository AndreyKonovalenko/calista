import {useEffect} from 'react'
import api from '../utils/calista-api'

const useSse = () => {
   useEffect(()=> {
    const eventSource = api.sse.setConnection() 
    eventSource.onopen = (event) => console.log(">>> Connection open", eventSource.readyState, event)
    eventSource.onerror = (err) => console.log("Error",err) 

    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      console.log(stockData)
    };

   const  handleClose = () => {
      eventSource.close()
      console.log('clean up', eventSource.readyState)
    }
    return handleClose;
  }, [])
}
export default useSse
