import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Deck from './pages/Deck'
import LessonList from './pages/LessonList';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Readings from './pages/Readings';
import Signin from './pages/Signin';
import SavedReading from './pages/SavedReading';

function App() {
  // State hook to manage user state
  // const [user, setUser] = useState(null)

  // // Effect hook to fetch user data on component mount
  // useEffect(() => {
  //   fetch('http://localhost:8080//authenticate-session')
  //   .then((res) => {
  //     if (res.ok){
  //       return res.json() // Parse JSON data if response is OK
  //     }else{
  //       console.error('user not found') // Log error if user not found
  //     }
  //   })
  //   .then(data => setUser(data)) // Update user state with fetched data
  // }, [])

  // Function to update user state
  // const updateUser = (user) => {
  //   setUser(user)
  // } 

  return (
    <>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/deck' element={<Deck/>}/>
          <Route path='/lesson-list' element={<LessonList/>}/>
          <Route path='/lesson/:id' element={<Lesson/>}/>
          <Route path='/readings' element={<Readings/>}/>
          <Route path='/readings/:id' element={<SavedReading/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
