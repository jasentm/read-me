import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function SignUpForm({updateUser}) {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate()
  
  const handleSubmit = (values) => {
    // Determine the URL based on whether the user is signing up or logging in
    const url = 'http://localhost:5555/users';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email.toLowerCase(), // Convert email to lowercase to ensure case-insensitivity
        password: values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error');
        }
      })
      .then((data) => {
        updateUser(data); // Update user state with response data
        console.log('Success:', data);
        navigate('/', { relative: 'path' }); // Navigate to home page on successful login/signup
      })
      .catch((error) => {
        console.error('Error:', error);
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
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                    />
                    <ErrorMessage name="username" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <ErrorMessage name="email" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="password" component="div" className="error" />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#1E5F22' }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <NavLink to='/login'>
                <Link variant="body2">
                  Already have an account? Sign in
                </Link>
                </NavLink>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}