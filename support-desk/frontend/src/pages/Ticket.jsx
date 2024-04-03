import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTicketById, reset } from '../features/tickets/ticketSlice'

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

  return (
    <div>
      <h1>Ticket</h1>
    </div>
  )
}

export default Ticket
