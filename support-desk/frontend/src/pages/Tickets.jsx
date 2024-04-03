import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const Tickets = () => {
  // Getting the ticket state from the store
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  // Initializing the dispatch
  const dispatch = useDispatch()

  // Resetting the ticket state when the component unmounts
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  // Fetching the tickets when the component mounts
  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  // Displaying the loading spinner while fetching the tickets
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <div key={ticket._id} className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString()}</div>
            <div>{ticket.product}</div>
            <div>{ticket.status}</div>
            <div>
              <Link to={`/tickets/${ticket._id}`}>
                <button className='btn'>View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Tickets
