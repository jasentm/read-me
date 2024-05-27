import React from 'react'
import './AIPopup.css'

const AIPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>
          Please note that use of AI requires a Google Gemini API key and is subject to Google Gemini's 1,500 RPD (requests per day). <br /><br />Would you like to use AI?
        </p>
        <div className="popup-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AIPopup