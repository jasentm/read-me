import React, { useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color=''>
        <Toolbar>
          <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Read Me
          </Typography>
          <Button color="inherit" component={NavLink} to="/profile/:id">
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;