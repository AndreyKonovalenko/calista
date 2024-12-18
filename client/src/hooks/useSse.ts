import {useEffect} from 'react'
import api from '../utils/calista-api'

const useSse = () => {
   useEffect(()=> {
    const eventSource = api.sse.setConnection() 
    eventSource.onopen = () => console.log(">>> Connection open", eventSource.readyState)
    eventSource.onerror = (err) => console.log("Error",err) 
    return () => {
      eventSource.close()
      console.log('clean up', eventSource.readyState)
    }
  }, [])
 
}
export default useSse
