import { useState, useEffect } from 'react'

function useFetch() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  

  return { data, loading, error }
}

export default useFetch
