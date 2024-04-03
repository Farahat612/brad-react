import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getTicketById,
  reset,
  closeTicket,
} from '../features/tickets/ticketSlice'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const Ticket = () => {
  // Accessing the ticket state from the store
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )

  // Getting the dispatch function from the useDispatch hook
  const dispatch = useDispatch()

  // Getting the ticketId from the URL params
  const { ticketId } = useParams()

  // Initialize the navigate function
  const navigate = useNavigate()

  // Fetching the ticket by the ticketId when the component mounts
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicketById(ticketId))
    // Resetting the ticket state when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [dispatch, ticketId, isError, message])

  // Displaying a spinner while the ticket is being fetched
  if (isLoading) {
    return <Spinner />
  }

  // Displaying an error message if the ticket fetching fails
  if (isError) {
    return <h3>Something went wrong!</h3>
  }

  // Closing the ticket
  const onTicketClose = async () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed successfully!')
    navigate('/tickets')
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted :{new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p> {ticket.description} </p>
        </div>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
