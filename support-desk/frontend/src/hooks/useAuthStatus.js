import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Custom hook to check the authentication status.
// @returns {Object} An object containing the authentication status and checking status.
// @property {boolean} isAuthenticated - Indicates whether the user is authenticated or not.
// @property {boolean} checkingStatus - Indicates whether the authentication status is being checked or not.

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  // Get the user from the Redux store
  const { user } = useSelector((state) => state.auth)
  // Check the user and set the authentication status
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    // Set the checking status to false
    setCheckingStatus(false)
  }, [user])

  return { isAuthenticated, checkingStatus }
}
