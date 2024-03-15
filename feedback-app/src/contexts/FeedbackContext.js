import { createContext, useState, useEffect } from 'react'
// import FeedbackData from '../data/FeedbackData'
const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
    }
  }

  const handleAdd = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks])
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Fetch the feedback data from json-server
  const fetchFeedbackData = async () => {
    const res = await fetch(
      'http://localhost:6000/feedback?_sort=id&_order=desc'
    )
    const data = await res.json()
    setFeedbacks(data)
  }

  useEffect(() => {
    fetchFeedbackData()
  }, [])

  // setting the feedback item to be edited
  const handleEdit = (feedback) => {
    setFeedbackEdit({ item: feedback, edit: true })
  }

  // updating the feedback item
  const handleUpdate = (id, updatedFeedback) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === id ? updatedFeedback : feedback
      )
    )
    setFeedbackEdit({ item: {}, edit: false })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        handleDelete,
        handleAdd,
        handleEdit,
        feedbackEdit,
        handleUpdate,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export { FeedbackProvider }
export default FeedbackContext
