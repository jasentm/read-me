import React from 'react'

export default function Profile({user}) {
  
  
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
            
          </div>
          <div className="page right">
          <div className='readings-title'>
              <h2>Your Readings</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
