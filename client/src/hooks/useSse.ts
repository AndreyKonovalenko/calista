import {useEffect, useState} from 'react'
import api from '../utils/calista-api'

const useSse = () => {

  const [status, setStatus]= useState(4)
  
  useEffect(() => {
    console.log(status) 
  }, [status])

  useEffect(()=> {
    const eventSource = api.sse.setConnection() 
    setStatus(eventSource.readyState)
    return () => {
      console.log('clean up')
      eventSource.close()
    }
  }, [])
 
}
export default useSse
