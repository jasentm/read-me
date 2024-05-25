import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonStats from '../components/LessonStats';

const Lesson = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5555/lesson-questions/${id}`)
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
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setShowContinueButton(true);
  };

  const handleContinue = () => {
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setShowContinueButton(false);
    if (currentQuestionIndex === questions.length - 1) {
      // All questions answered, create new lesson statistics
      fetch(`http://localhost:5555/lesson-statistics/${user.id}/${id}`, {
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
            console.error("Something went wrong with your GET request.");
          }
        })
        .then(data => {
          console.log(data);
          setLessonCompleted(true); // Set lessonCompleted to true
        })
        .catch(error => console.error(error));
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
      return <button onClick={() => handleAnswerSelect(answer)}><img src={answer} alt={answer} /></button>;
    } else {
      return <button onClick={() => handleAnswerSelect(answer)}>{answer}</button>;
    }
  };

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      {renderAnswer(currentQuestion.answer1)}
      {renderAnswer(currentQuestion.answer2)}
      {renderAnswer(currentQuestion.answer3)}
      {renderAnswer(currentQuestion.answer4)}
      {showContinueButton ? (
        <button onClick={handleContinue}>
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Continue'}
        </button>
      ) : (
        <button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
          Check
        </button>
      )}
      {isAnswerCorrect !== null && (
        <div>
          {isAnswerCorrect ? (
            <p>Correct!</p>
          ) : (
            <p>Incorrect. {currentQuestion.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
