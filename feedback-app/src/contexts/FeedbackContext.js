import { createContext, useState, useEffect } from 'react'
// import FeedbackData from '../data/FeedbackData'
const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
    }
  }

  const handleAdd = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await res.json()
    setFeedbacks([data, ...feedbacks])
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedbackData()
  }, [])

  // Fetch the feedback data from json-server
  const fetchFeedbackData = async () => {
    const res = await fetch('/feedback?_sort=id&_order=desc')
    const data = await res.json()
    setFeedbacks(data)
    setIsLoading(false)
  }

  // setting the feedback item to be edited
  const handleEdit = (feedback) => {
    setFeedbackEdit({ item: feedback, edit: true })
  }

  // updating the feedback item
  const handleUpdate = async (id, updatedFeedback) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedFeedback),
    })
    const data = await res.json()
    setFeedbacks(
      feedbacks.map((feedback) => (feedback.id === id ? data : feedback))
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export { FeedbackProvider }
export default FeedbackContext
