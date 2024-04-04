import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

import {
  getTicketById,
  reset,
  closeTicket,
} from '../features/tickets/ticketSlice'
import { getNotes } from '../features/notes/noteSlice'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

// Defining custom styles for the modal
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
// Setting the app element for the modal
Modal.setAppElement('#root')

const Ticket = () => {
  // Accessing the ticket state from the store
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )

  // Accessing the notes state from the store
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(ticketId))
    // Resetting the ticket state when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [dispatch, ticketId, isError, message])

  // Closing the ticket
  const onTicketClose = async () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed successfully!')
    navigate('/tickets')
  }

  // ---------------- Create Note Modal Functionality -------------------
  // Defining the state variables for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noteContent, setNoteContent] = useState('')
  // Open and close Modal
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)


  // Displaying a spinner while the ticket is being fetched
  if (isLoading || notesIsLoading) {
    return <Spinner />
  }
  // Displaying an error message if the ticket fetching fails
  if (isError) {
    return <h3>Something went wrong!</h3>
  }
  // Displaying the ticket details
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

        <div className='ticket-notes'>
          <h3>Notes</h3>
        </div>
      </header>
      {/* Button to add a new note */}
      {ticket.status !== 'closed' && (
        <button
          className='btn'
          onClick={openModal}
        >
          <FaPlus /> Add Note
        </button>
      )}
      {/* Create Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Create Note'
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form>
          <div className='form-group'>
            <label htmlFor='noteContent'>Note Content</label>
            <textarea
              id='noteContent'
              name='noteContent'
              className='form-control'
              placeholder='Enter note content...'
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault()
              // Add the note
              // Close the modal
              // Clear the note content
              closeModal()
              setNoteContent('')
            }}
          >
            Add Note
          </button>
          <button
            className='btn btn-secondary'
            onClick={(e) => {
              e.preventDefault()
              // Close the modal
              // Clear the note content
              closeModal()
              setNoteContent('')
            }}
          >
            Cancel
          </button>
        </form>
      </Modal>

      {/* Displaying the notes */}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
