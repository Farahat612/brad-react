import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // initializing Navigate
  const navigate = useNavigate()

  // Creating a state variable to store the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // Destructuring the form data
  const { name, email, password, password2 } = formData

  // Accessing the dispatch method
  const dispatch = useDispatch()

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
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      // Creating an object to hold the form data
      const userData = { name, email, password }
      // Dispatching the register action
      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }
    // reset the state
    dispatch(reset())
  }, [isSuccess, user, message, isError, navigate, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Enter your name'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
            <input
              className='form-control'
              type='password'
              placeholder='Confirm your password'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Register</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
