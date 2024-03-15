import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
// import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

import { FeedbackProvider } from './contexts/FeedbackContext'


function App() {
  // Commented all of these after using context API
  // const [feedbacks, setFeedbacks] = useState(FeedbackData)
  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this feedback?')) {
  //     setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
  //   }
  // }

  // const handleAdd = (newFeedback) => {
  //   setFeedbacks([...feedbacks, newFeedback])
  // }
  return (
    <FeedbackProvider>
      <Header />
      <div className='container'>
        <FeedbackForm addFeedback={handleAdd} />
        <FeedbackStats feedbacks={feedbacks} />
        <FeedbackList/>
      </div>
    </FeedbackProvider>
  )
}

export default App
