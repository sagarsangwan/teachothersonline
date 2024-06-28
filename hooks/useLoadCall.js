"use client"
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

function useLoadCall(id) {
  const client = useStreamVideoClient()
  const [call, setCall] = useState(null)
  const [callLoading, setCallLoading] = useState(false)
  useEffect(() => {
    async function loadCall() {
      setCallLoading(true);
      if (!client) {
        return
      }
      const { calls } = await client.queryCalls({
        filter_conditions: { id }
      })
      if (calls.length > 0) {
        const call = calls[0]
        await call.get()
        setCall(call)
      }
      setCallLoading(false)
    }
    loadCall()
  }, [id, client])
  return { call, callLoading }

}

export default useLoadCall
