import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  // Initializing the navigate hook
  const navigate = useNavigate()
  // Accessing the dispatch method
  const dispatch = useDispatch()
  // Accessing the user state from the store using the useSelector hook
  const { user } = useSelector((state) => state.auth)
  // Creating a function to handle user logout
  const handleLogout = () => {
    // Dispatching the logout action
    dispatch(logout())
    // Dispatching the reset action
    dispatch(reset())
    // Redirecting to the login page
    navigate('/login')
  }
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className='btn' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
