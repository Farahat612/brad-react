import { useState } from 'react'

const FeedbackItem = () => {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('Just example')
  return (
    <div className='card'>
      <div className='num-display'>{rating}</div>
      <div className='text-display'>{text}</div>
      <button onClick={() => setRating(rating + 1)}>Increase</button>
    </div>
  )
}

export default FeedbackItem
