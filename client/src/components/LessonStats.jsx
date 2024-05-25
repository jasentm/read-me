import React from 'react'
import { useNavigate } from 'react-router-dom';

const LessonStats = ({ correctAnswers}) => {
    const navigate = useNavigate()
    
    const handleHomeClick = () => {
        navigate('/', { relative: 'path' });
    };
  
    return (
      <div>
        <h2>Lesson Stats</h2>
        <p>You got {correctAnswers}/10 correct!</p>
        <button onClick={handleHomeClick}>Home</button>
      </div>
    );
  };
  
  export default LessonStats;
