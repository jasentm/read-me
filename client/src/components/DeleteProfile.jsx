import React, { useState } from 'react';

const DeleteProfile = ({ user, onProfileDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:5555/users/${user.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onProfileDelete();
        } else {
          console.error('Failed to delete profile');
        }
      })
      .catch((error) => {
        console.error('Error deleting profile:', error);
      });
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    handleDelete();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h2>Delete Profile</h2>
      <p>Are you sure you want to delete your profile?</p>
      <button onClick={handleConfirmDelete} style={{backgroundColor: '#B32626 '}}>Delete Profile</button>

      {showConfirmation && ( //conditional rendering of confirmation
        <div className="confirmation-popup">
          <div className="popup-content">
            <h3>Confirm Profile Deletion</h3>
            <p>Are you sure you want to permanently delete your profile?</p>
            <div className="buttons">
              <button onClick={confirmDelete} style={{margin: 5, backgroundColor: '#B32626 '}}>Confirm</button>
              <button onClick={cancelDelete} style={{margin: 5, backgroundColor: 'gray'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProfile;