import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

function App() {
  const [feedbacks, setFeedbacks] = useState(FeedbackData)
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
    }
  }
  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackStats feedbacks={feedbacks} />
        <FeedbackList feedbacks={feedbacks} deleteFeedback={handleDelete} />
        <FeedbackForm />
      </div>
    </>
  )
}

export default App
