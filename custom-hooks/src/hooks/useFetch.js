/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

function useFetch(url, options) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        const jsonData = await res.json()
        setData(jsonData)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}

export default useFetch
