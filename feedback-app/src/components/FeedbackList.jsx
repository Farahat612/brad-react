import FeedbackItem from "./FeedbackItem"
import PropTypes from 'prop-types'

const FeedbackList = ({feedbacks}) => {
  if(!feedbacks || feedbacks.length === 0) {
    return <h2>No feedbacks available</h2>
  }
  return (
    <div className="feedback-list">
      {
        feedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))
      }
    </div>
  )
}

FeedbackList.propTypes = {
  feedbacks: PropTypes.array.isRequired,
}

export default FeedbackList
