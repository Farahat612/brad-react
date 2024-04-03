import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTicket, reset } from '../features/tickets/ticketSlice' // Import the createTicket action
import Spinner from '../components/Spinner'


const NewTicket = () => {
  // Get the user from the Redux store
  const { user } = useSelector((state) => state.auth)
  // Create states for user info
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  // Create the ticket state
  const [ticket, setTicket] = useState({
    product: 'product1',
    description: '',
  })

  // Acessing the ticket state from the Redux store
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  )
  // Initalize a dispatch function
  const dispatch = useDispatch()
  // Initalize a navigate function
  const navigate = useNavigate()

  // Handle the success and error messages side effects
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, navigate])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Check if the description is empty
    if (!ticket.description) {
      return toast.error('Please provide a description')
    }
    // Create a new ticket using the createTicket action
    dispatch(createTicket(ticket))
  }

  // Display a spinner while the ticket is being created
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            className='form-control'
            type='text'
            id='name'
            name='name'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input
            className='form-control'
            type='email'
            id='email'
            name='email'
            value={email}
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              id='product'
              name='product'
              value={ticket.product}
              onChange={(e) =>
                setTicket({ ...ticket, product: e.target.value })
              }
            >
              <option value='product1'>Product 1</option>
              <option value='product2'>Product 2</option>
              <option value='product3'>Product 3</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              placeholder='description...'
              id='description'
              name='description'
              value={ticket.description}
              onChange={(e) =>
                setTicket({ ...ticket, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
