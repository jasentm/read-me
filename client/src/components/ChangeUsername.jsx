import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChangeUsernameSchema = Yup.object().shape({
  newUsername: Yup.string(),
});

const ChangeUsername = ({ user, onUsernameChange }) => {
  const initialValues = {
    newUsername: '',
  };

  
  const handleSubmit = (values, { resetForm }) => {
    fetch(`http://localhost:5555/users/${user.id}`, {
      method: 'PATCH', //patch request to update username
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: values.newUsername }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to update username');
        }
      })
      .then((data) => {
        onUsernameChange(data);
        resetForm();
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
  };

  return (
    <div>
      <div>
        <h2>Change Username</h2>
      </div>
    
      <Formik
        initialValues={initialValues}
        validationSchema={ChangeUsernameSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="newUsername"
              placeholder="Enter new username"
            />
            <ErrorMessage name="newUsername" component="div" className="error" />
            <div style={{padding: 30}}>
            <button type="submit" disabled={isSubmitting}>
              Change Username
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUsername;