import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Login = () => {
  // Creating a state variable to store the form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Destructuring the form data
  const { email, password } = formData

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
    console.log(formData)
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
