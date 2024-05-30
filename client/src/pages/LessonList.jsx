import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LessonList.css';
import { useSound } from 'use-sound';
import Page from '/sounds/Page.mp3'

export default function LessonList({ user }) {
  const [lessons, setLessons] = useState([]);
  const [playPage] = useSound(Page)

  useEffect(() => { //fetch lesson titles to display 
    fetch(`http://localhost:5555/lessons`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error('Could not fetch lesson data');
        }
      })
      .then(data => {
        setLessons(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [user]);

  useEffect(() => {
    playPage(); //play sound when page loads 
  }, [playPage]);


  return (
    <div className="lessons-page">
      <div className="content">
        <div className='lesson-title'>
          <h1>The Lessons</h1>
        </div>
        <div className={`book `} >
          <div className="page left">
            {lessons.slice(0, Math.ceil(lessons.length / 2)).map(lesson => ( //display half of array on one side of page
              <div className="lesson-card" key={lesson.id}>
                <Link to={`/lesson/${lesson.id}`}>
                  <h2>{lesson.type}</h2> 
                </Link>
              </div>
            ))}
          </div>
          <div className="page right">
            {lessons.slice(Math.ceil(lessons.length / 2)).map(lesson => ( //display half of array on one side of page
              <div className="lesson-card" key={lesson.id}>
                <Link to={`/lesson/${lesson.id}`}>
                  <h2>{lesson.type}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}