import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChangeUsernameSchema = Yup.object().shape({
  newUsername: Yup.string().required('New username is required'),
});

const ChangeUsername = ({ user, onUsernameChange }) => {
  const initialValues = {
    newUsername: '',
  };

  //TODO ensure a user can't change their name to one that already exists in the db
  const handleSubmit = (values, { resetForm }) => {
    fetch(`http://localhost:5555/users/${user.id}`, {
      method: 'PATCH',
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
      <h2>Change Username</h2>
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
            <button type="submit" disabled={isSubmitting}>
              Change Username
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUsername;