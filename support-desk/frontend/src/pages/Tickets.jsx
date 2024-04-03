import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
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
    <div>
      <h1>Tickets</h1>
    </div>
  )
}

export default Tickets
