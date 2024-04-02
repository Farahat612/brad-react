import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  // Creating a state variable to store the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // Destructuring the form data
  const { name, email, password, password2 } = formData

  // Creating a function to handle form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
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
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
