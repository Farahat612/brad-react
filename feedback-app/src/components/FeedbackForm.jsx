import { useState } from 'react'
import Card from './shared/Card'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const handleTextChange = (e) => {
    setText(e.target.value)
  }
  return (
    <Card>
      <form>
        <h2>How would you rate us?</h2>
        {/* // Todo: rating select component */}
        <div className='input-group'>
          <input
            value={text}
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </Card>
  )
}

export default FeedbackForm
