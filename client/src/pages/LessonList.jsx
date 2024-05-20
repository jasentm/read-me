import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LessonList.css';

export default function LessonList({ user }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5555/lesson-statistics/${user.id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error('Could not fetch lesson statistics data');
        }
      })
      .then(data => {
        setLessons(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user]);

  return (
    <div className="lessons-page">
      <div className="content">
        <div className='title'>
          <h1>The Lessons</h1>
        </div>
        <div className={`book `} >
          <div className="page left">
            {lessons.slice(0, Math.ceil(lessons.length / 2)).map(lesson => (
              <div className="lesson-card" key={lesson.id}>
                <Link to={`/lesson/${lesson.id}`}>
                  <h2>{lesson.lesson.type}</h2>
                </Link>
              </div>
            ))}
          </div>
          <div className="page right">
            {lessons.slice(Math.ceil(lessons.length / 2)).map(lesson => (
              <div className="lesson-card" key={lesson.id}>
                <Link to={`/lesson/${lesson.id}`}>
                  <h2>{lesson.lesson.type}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}