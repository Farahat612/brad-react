// import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../contexts/FeedbackContext'
const FeedbackStats = () => {

  const { feedbacks } = useContext(FeedbackContext)
  //calculate ratings average
  const ratingsAverage =
    feedbacks.reduce((total, feedback) => {
      return total + feedback.rating
    }, 0) / feedbacks.length

  return (
    <div className='feedback-stats'>
      <h4>{feedbacks.length} reviews</h4>
      <h4>
        {isNaN(ratingsAverage)
          ? 0
          : ratingsAverage.toFixed(1).replace(/[.,]0$/, '')}
      </h4>
    </div>
  )
}

// FeedbackStats.propTypes = {
//   feedbacks: PropTypes.array.isRequired,
// }

export default FeedbackStats
