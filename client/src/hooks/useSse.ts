import {useEffect} from 'react'
import api from '../utils/calista-api'

const useSse = () => {
  useEffect(()=> {
    const eventSource = api.sse.setConnection() 
    console.log('set up', eventSource)
    return () => {
      console.log('clean up')
      eventSource.close()
    }
  }, [])
 
}
export default useSse
