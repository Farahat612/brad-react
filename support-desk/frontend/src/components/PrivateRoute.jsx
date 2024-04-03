import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  // Get the authentication status and checking status
  const { isAuthenticated, checkingStatus } = useAuthStatus()
  // Show a spinner while checking the authentication status
  if (checkingStatus) {
    return <Spinner />
  }
  // Redirect to the login page if the user is not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
