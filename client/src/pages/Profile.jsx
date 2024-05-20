import React from 'react'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Profile.css'
import { Button } from '@mui/material';

export default function Profile({user}) {
  const [readings, setReadings] = useState([])
  const [completedLessons, setCompletedLessons] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5555/readings/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReadings(data);
        } else {
          setReadings([]);  // Set to empty array if error
        }
      })
      .catch((error) => console.error('Error fetching readings:', error));

    fetch(`http://localhost:5555/completed/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCompletedLessons(data);
        } else {
          setCompletedLessons([]);  // Set to empty array if error
        }
      })
      .catch((error) => console.error('Error fetching completed lessons:', error));
  }, [user]);
  
  if (!readings || !completedLessons) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="content">
        <div className='title'>
          <h1>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s Grimoire</h1>
        </div>
        <div className={`book `} >
          <div className="page left">
            <div className='lessons-title'>
              <h2>Your Completed Lessons</h2>
            </div>
            <Button 
              className='lesson-button '
              variant="contained" 
              component={Link} to='/'
              sx={{ mt: -1, mb: 3, backgroundColor: '#1E5F22', fontFamily: 'cursive'}}>
                Take a Lesson
              </Button>
            <div className='lesson-container'>
              {completedLessons.length <=2 ? (
                <div className='no-lessons-message'>
                  <h3>You haven't completed any lessons yet...</h3>
                </div>
              ) :
              <>
                {completedLessons.map((lesson) => (
                  <div className="lesson-card" key={lesson.id}>
                    <h2>{lesson.lesson.type} {lesson.updated_at}</h2>
                </div>
                ))}
              </>
              }
            </div>
          </div>
          <div className="page right">
          <div className='readings-title'>
              <h2>Your Readings</h2>
            </div>
            <Button 
              className='reading-button '
              variant="contained" 
              component={Link} to='/readings'
              sx={{ mt: -1, mb: 3, backgroundColor: '#1E5F22', fontFamily: 'cursive'}}>
                Get a Reading
              </Button>
          <div className='reading-container'>
          {readings.length <= 2 ? (
                <div className='no-readings-message'>
                  <h3>You haven't had any readings yet...</h3>
                </div>
              ) :
              <>
                {readings.map((reading) => (
                  <div className="lesson-card" key={reading.id}>
                    <Link to={`/readings/${reading.id}`}>
                      <h2>{reading.created_at}</h2>
                    </Link>
                </div>
                ))}
              </>
              }
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
