const FeedbackStats = ({ feedbacks }) => {

  //calculate ratings average
  const ratingsAverage = feedbacks.reduce((total, feedback) => {
      return total + feedback.rating 
    }, 0) / feedbacks.length
  
  return (
    <div className='feedback-stats'>
      <h4>{feedbacks.length} reviews</h4>
      <h4>
        {isNaN(ratingsAverage) ? 0 : ratingsAverage.toFixed(1)} 
        /10 stars average rating
      </h4>
    </div>
  )
}

export default FeedbackStats
