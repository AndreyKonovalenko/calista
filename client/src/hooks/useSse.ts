import {useEffect} from 'react'
import api from '../utils/calista-api'

const useSse = () => {
  useEffect(()=> {
    const eventSource = api.sse.setConnection() 
    return () => eventSource.close()
  }, [])
 
}
export default useSse
