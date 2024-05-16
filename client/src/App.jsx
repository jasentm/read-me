import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Deck from './pages/Deck'
import LessonList from './pages/LessonList';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Readings from './pages/Readings';
import Login from './pages/Login';
import SavedReading from './pages/SavedReading';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUpForm';

function App() {
  // State hook to manage user state
  const [user, setUser] = useState(null)

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetch('http://localhost:5555//authenticate-session')
    .then((res) => {
      if (res.ok){
        return res.json() // Parse JSON data if response is OK
      }else{
        console.error('user not found') // Log error if user not found
      }
    })
    .then(data => setUser(data)) // Update user state with fetched data
  }, [])

  // Function to update user state
  const updateUser = (user) => {
    setUser(user)
  } 

  // if (!user) {
  //   return (
  //     <div className='app'>
  //       <NavBar/>
  //       <Login user={user} updateUser={updateUser}/>
  //     </div>
  //   )
  // } else {

  return (
    <>
      <div className='app'>
        {/* NavBar component that receives user state and updateUser function */}
        <NavBar/>
        {/* Router setup with routes for different pages */}
        <Routes>
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/deck' element={<Deck/>}/>
          <Route path='/' element={<LessonList/>}/>
          <Route path='/lesson/:id' element={<Lesson/>}/>
          <Route path='/readings' element={<Readings/>}/>
          <Route path='/readings/:id' element={<SavedReading/>}/>
          <Route path='/login' element={<Login updateUser={updateUser}/>}/>
          <Route path='/signup' element={<SignUpForm updateUser={updateUser}/>}/>
        </Routes>
      </div>
    </>
  )
// }
}

export default App
