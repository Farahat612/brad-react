import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const Tickets = () => {
  return (
    <div>
      <h1>Tickets</h1>
    </div>
  )
}

export default Tickets
