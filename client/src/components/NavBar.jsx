import React, { useState } from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavBar = ({user, updateUser}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5555/logout')
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

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <AppBar position="fixed" sx={{ borderRadius: 2, maxWidth: '700px', margin: '0 auto', left: 0, right: 0, backgroundColor:'#F9AB84', color: '#2B1873' }}>
      <Toolbar sx={{ justifyContent: 'center'}}>
          <Typography sx={{color:'#2B1873', padding: 2, fontFamily: 'cursive', fontSize: 24}}variant="h6" component={NavLink} to="/">
            Read Me
          </Typography>
          <Button color="inherit" component={NavLink} to="/profile/">
            My Grimoire
          </Button>
          <Button color="inherit" component={NavLink} to="/deck">
            The Deck
          </Button>
          <Button color="inherit" component={NavLink} to="/">
            The Lessons
          </Button>
          <Button color="inherit" component={NavLink} to="/readings">
            The Readings
          </Button>
          {user && (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;