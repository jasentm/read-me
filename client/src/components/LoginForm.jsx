import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './LoginForm.css';
import { NavLink, useNavigate } from 'react-router-dom';

// Validation schema for the login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = ({ updateUser }) => {
  const [authError, setAuthError] = useState('');
  
  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setAuthError('');
    const url = 'http://localhost:5555/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email.toLowerCase(),
        password: values.password,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Incorrect username or password');
      }
    })
    .then(data => {
      localStorage.setItem('userId', data.id);
      updateUser(data);
      navigate('/', { relative: 'path' });
    })
    .catch(error => {
      setAuthError(error.message);
      setSubmitting(false);
    });
  };

  const theme = createTheme({
    palette: {
      background: {
        default: '#1C0730',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AutoFixHighIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <ErrorMessage name="email" component="div" className="error" />
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" component="div" className="error" />
                  {authError && <div className="error">{authError}</div>}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#1E5F22' }}
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                  <NavLink to="/signup">
                    <Link variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </NavLink>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
