import FeedbackItem from './FeedbackItem'
// import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

import { useContext } from 'react'
import FeedbackContext from '../contexts/FeedbackContext'

const FeedbackList = () => {
  const { feedbacks, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedbacks || feedbacks.length === 0)) {
    return <h2>No feedbacks available</h2>
  }
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <FeedbackItem key={feedback.id} feedback={feedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

    // Without Animation :
    // <div className="feedback-list">
    //   {
    //     feedbacks.map((feedback) => (
    //       <FeedbackItem key={feedback.id} feedback={feedback} deleteFeedback={deleteFeedback} />
    //     ))
    //   }
    // </div>
  )
}

// FeedbackList.propTypes = {
//   feedbacks: PropTypes.array.isRequired,
//   deleteFeedback: PropTypes.func.isRequired,
// }

export default FeedbackList
