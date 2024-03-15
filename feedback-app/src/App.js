import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';

function App() {
  const [feedbacks, setFeedbacks] = useState(FeedbackData);
  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  }
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedbacks={feedbacks} deleteFeedback={handleDelete} />
      </div>
    </>
  );
}

export default App;
