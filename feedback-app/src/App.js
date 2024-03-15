import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FeedbackItem from './components/FeedbackItem';
import FeedbackData from './data/FeedbackData';

function App() {
  const [feedbacks, setFeedbacks] = useState(FeedbackData);
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackItem />
      </div>
    </>
  );
}

export default App;
