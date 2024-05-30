import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonStats from '../components/LessonStats';
import './Lesson.css'
import {useSound} from 'use-sound'
import Success from '/sounds/Success.mp3'
import Failure from '/sounds/Failure.wav'

const Lesson = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //state for index of current question
  const [selectedAnswer, setSelectedAnswer] = useState(''); //state for selected answer 
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); //state for conditional rendering if answer is correct or incorrect
  const [correctAnswers, setCorrectAnswers] = useState(0); //state to track score for lesson
  const [lessonCompleted, setLessonCompleted] = useState(false); //state for conditional rendering of lessonstats component
  const [showContinueButton, setShowContinueButton] = useState(false); //state for conditional rendering of continue button 
  const [playSuccess] = useSound(Success)
  const [playFailure] = useSound(Failure)

  useEffect(() => {
    fetch(`http://localhost:5555/lesson-questions/${id}`) //fetch random 10 lesson questions from database
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Something went wrong with your GET request.");
        }
      })
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleAnswerSelect = answer => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex]; //tracking current question
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1); //tracking current score
      playSuccess()
    } else {
      playFailure(); 
    }
    setShowContinueButton(true);
  };

  const handleContinue = () => {
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setShowContinueButton(false);
    if (currentQuestionIndex === questions.length - 1) {
      // All questions answered, create new lesson statistics
      fetch(`http://localhost:5555/lesson-statistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id, lesson_id: id, completed: true, correct_answers: correctAnswers }),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("Something went wrong with your POST request.");
          }
        })
        .then(data => {
          console.log(data);
          setLessonCompleted(true); // Set lessonCompleted to true
        })
        .catch(error => console.error(error));
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1); //tracking current question
    }
  };

  if (lessonCompleted) {
    return <LessonStats correctAnswers={correctAnswers} totalQuestions={questions.length} navigate={navigate} />;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex]; 

  const isImageAnswer = answer => {
    return answer.startsWith('/'); 
  };

  const renderAnswer = answer => {
    if (isImageAnswer(answer)) {
      return <button className='image-button' onClick={() => handleAnswerSelect(answer)}><img src={answer} alt={answer} /></button>; //changes rendering of answer buttons depending on type 
    } else {
      return <button className='text-button' onClick={() => handleAnswerSelect(answer)}>{answer}</button>;
    }
  };

  return (
    <div className='lesson-page'>
      <div className='question-title'>
        <h1>Question {currentQuestionIndex + 1}</h1> 
      </div>
      <div className='question-container'>
        <h2>{currentQuestion.question}</h2> {/* renders one question at a time */}
      </div>
      <div className='answer-container'>
        <div className='answer1-container'>
          {renderAnswer(currentQuestion.answer1)}
        </div>
        <div className='answer2-container'>
          {renderAnswer(currentQuestion.answer2)}
        </div>
        <div className='answer3-container'>
          {renderAnswer(currentQuestion.answer3)}
        </div>
        <div className='answer4-container'>
          {renderAnswer(currentQuestion.answer4)}
        </div>
      </div>
      <div className='check-continue-button-container'>
        {showContinueButton ? ( //conditionally renders Finish or Continue button
          <button onClick={handleContinue}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Continue'}
          </button>
        ) : (
          <button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
            Check
          </button>
        )}
      </div>
      {isAnswerCorrect !== null && (
        <div className='correct-explanation-container'>
          {isAnswerCorrect ? ( //conditionally renders correct or incorrect answer
            <h2 className='correct'>Correct!</h2>
          ) : (
            <h2 className='incorrect'>Incorrect. {currentQuestion.explanation}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
