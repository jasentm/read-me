import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { Button } from '@mui/material';
import { useSound } from 'use-sound';
import Page from '/sounds/Page.mp3';
import ChangeUsername from '../components/ChangeUsername';
import DeleteProfile from '../components/DeleteProfile';

export default function Profile({ user, updateUser }) {
  const [readings, setReadings] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [playPage] = useSound(Page);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  useEffect(() => { //fetch readings associated with a user 
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

    fetch(`http://localhost:5555/completed/${user.id}`) //fetch lesson statistics for a user
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCompletedLessons(data);
        } else {
          setCompletedLessons([]);  // Set to empty array if error
        }
      })
      .catch((error) => {
        console.error('Error fetching completed lessons:', error);
        setCompletedLessons([]);  // Set to empty array if error
      });

    }, [user]);
    
    useEffect(() => {
      playPage();
    }, [playPage]);

    const handleUsernameChange = (updatedUser) => {
      // Update the user object with the new username
      updateUser(updatedUser);
      // You may also want to update the user object in your state or data store
    };
  
    const handleProfileDelete = () => {
      fetch('http://localhost:5555/logout') //delete user 
      .then((res)=>{
        if (res.ok){
          return (res.json())
        }else {
          return console.error('Error with logout')
        }
      })
      .then(res => {
        updateUser(null)
        localStorage.removeItem('userId'); // Clear the userId from local storage
      })
      navigate('/login', {relative: 'path'})
      .catch(error=>console.error(error))
    }

    const handleProfileOptionsToggle = () => {
      setShowProfileOptions(!showProfileOptions);
      playPage(); // Play the page sound when the button is clicked
    };

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
        {showProfileOptions ? ( //conditionally render profile options if button is clicked
            <>
              <div className="page left">
                <ChangeUsername user={user} onUsernameChange={handleUsernameChange} />
              </div>
              <div className="page right">
                <DeleteProfile user={user} onProfileDelete={handleProfileDelete} />
              </div>
            </>
          ) : (
          <>
          <div className="page left">
            <div className='lessons-title'>
              <h2>Your Completed Lessons</h2>
            </div>
            <Button 
              className='lesson-button '
              variant="contained" 
              component={Link} to='/'
              sx={{ mt: -1, mb: 3, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
                color: 'white'
              },}}>
                Take a Lesson
              </Button>
            <div className='lesson-container'> 
              {completedLessons.length <1 ? (
                <div className='no-lessons-message'>
                  <h3>You haven't completed any lessons yet...</h3> 
                </div>
              ) :
              <>
                {completedLessons.map((lesson) => (
                  <div className="lesson-card" key={lesson.id}>
                    <h2>{lesson.lesson.type} {lesson.correct_answers}/10 </h2>
                    <h4>{lesson.created_at} UTC</h4>
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
              color='primary'
              sx={{ mt: -1, mb: 3, fontFamily: 'cursive', backgroundColor: '#1E5F22', '&:hover': {
                color: 'white'}
                }}>
                Get a Reading
              </Button>
          <div className='reading-container'>
          {readings.length <1 ? (
                <div className='no-readings-message'>
                  <h3>You haven't had any readings yet...</h3>
                </div>
              ) :
              <>
                {readings.map((reading) => (
                  <div className="lesson-card" key={reading.id}>
                    <Link to={`/readings/${reading.id}`}>
                      <h2>{reading.created_at} UTC</h2>
                    </Link>
                </div>
                ))}
              </>
              }
          </div>
          </div>
          </>
           )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileOptionsToggle}
            sx={{backgroundColor: '#1E5F22', fontFamily: 'cursive'}}
          >
            {showProfileOptions ? 'Previous Page' : 'Profile Options'}
          </Button>
        </div>
      </div>
    </div>
    
  );
}
