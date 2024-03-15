import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'
const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState(FeedbackData)

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
    }
  }

  const handleAdd = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback])
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // setting the feedback item to be edited
  const handleEdit = (feedback) => {
    setFeedbackEdit({ item: feedback, edit: true })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        handleDelete,
        handleAdd,
        handleEdit,
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export { FeedbackProvider }
export default FeedbackContext
