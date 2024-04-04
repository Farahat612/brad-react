import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  // Getting the ticket state from the store
  const { tickets, isLoading } = useSelector((state) => state.tickets)

  // Initializing the dispatch
  const dispatch = useDispatch()

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
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
