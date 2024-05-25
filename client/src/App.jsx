import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import Deck from './pages/Deck';
import LessonList from './pages/LessonList';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Readings from './pages/Readings';
import SavedReading from './pages/SavedReading';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(()=> {
    const userId = localStorage.getItem('userId')
    if (userId){
      fetch("http://localhost:5555/authenticate-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
      })
      .then(res => {
        if (res.ok){
          return res.json()
        }else{
          console.error("Error during authentication")
        }
      })
      .then(res => {
        setUser(res)
        navigate('/', { relative: 'path' })
      })
      .catch(error => console.error(error));
    }
  }, [])


  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <div className="app">
      <NavBar user={user} updateUser={updateUser} />
      <Routes>
        {/* Render the login and signup forms outside the main Routes */}
        <Route path="/login" element={<LoginForm updateUser={updateUser} />} />
        <Route path="/signup" element={<SignUpForm updateUser={updateUser} />} />

        {/* Render the main application routes only if the user is authenticated */}
        {user ? (
          <>
            <Route path="/profile/" element={<Profile user={user} updateUser={updateUser}/>} />
            <Route path="/deck" element={<Deck />} />
            <Route path="/" element={<LessonList user={user} />} />
            <Route path="/lesson/:id" element={<Lesson user={user}/>} />
            <Route path="/readings" element={<Readings user={user}/>} />
            <Route path="/readings/:id" element={<SavedReading />} />
          </>
        ) : (
          // Redirect to the login page if the user is not authenticated
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;