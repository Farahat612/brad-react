import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

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
        <form>
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
              id='description'
              name='description'
              value={ticket.description}
              onChange={(e) =>
                setTicket({ ...ticket, description: e.target.value })
              }
            ></textarea>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  )
}

export default NewTicket
