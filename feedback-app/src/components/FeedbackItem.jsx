import Card from './shared/Card'
import PropTypes from 'prop-types'
import { FaTimes, FaEdit } from 'react-icons/fa'

import { useContext } from 'react'
import FeedbackContext from '../contexts/FeedbackContext'

const FeedbackItem = ({ feedback }) => {
  const { handleDelete, handleEdit } = useContext(FeedbackContext)

  return (
    <Card>
      <div className='num-display'>{feedback.rating}</div>
      <button className='close' onClick={() => handleDelete(feedback.id)}>
        <FaTimes color='purple' />
      </button>
      <button className='edit' onClick={() => handleEdit(feedback)} >
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{feedback.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  feedback: PropTypes.object.isRequired,
  // deleteFeedback: PropTypes.func.isRequired,
}

export default FeedbackItem
