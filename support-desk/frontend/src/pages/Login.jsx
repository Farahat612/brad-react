import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

const Login = () => {
  // Creating a state variable to store the form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Destructuring the form data
  const { email, password } = formData

  // Accessing the dispatch method
  const dispatch = useDispatch()

  // Initializing Navigate
  const navigate = useNavigate()

  // Accessing the user state from the store using the useSelector hook
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  // Creating a function to handle form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Creating a function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault()
    // Creating an object to hold the form data
    const userData = { email, password }
    // Dispatching the login action
    dispatch(login(userData))
  }

  // Handling the side effects for success, error, and user
  useEffect(() => {
    // Displaying the error message incase of an error
    if (isError) {
      toast.error(message)
    }
    // redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }
    // Dispatching the reset action
    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch, navigate])

  // Redndering the Spinner Component conditionally
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              placeholder='Enter your email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='Enter your password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
