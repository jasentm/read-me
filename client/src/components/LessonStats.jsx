import React from 'react'
import { useNavigate } from 'react-router-dom';

const LessonStats = ({ correctAnswers}) => {
    const navigate = useNavigate()
    
    const handleHomeClick = () => {
        navigate('/', { relative: 'path' });
    };
  
    return (
      <div>
        {correctAnswers >= 7 ? <h1>Congratulations!</h1> : <h1>Looks like you need some more studying...</h1>}
        <h1>You got {correctAnswers}/10 correct!</h1>
        <button onClick={handleHomeClick}>Home</button>
      </div>
    );
  };
  
  export default LessonStats;
