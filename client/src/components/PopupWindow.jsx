import React from 'react'
import './PopupWindow.css'

const PopupWindow = ({ card, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {/* Render the card details */}
        <div>
          <img src={card.image} alt={card.name}/>
          <h2>{card.name}</h2>
          <p>{card.number}</p>
          <p>{card.arcana}</p>
          {card.suit !== "Trump" && <p>Suit: {card.suit}</p>}
          <h3 style={{ textDecoration: 'underline' }}>Keywords:</h3>
          <ul>
            {card.keywords.map((keyword, index) => (
              <li key={index}>{keyword.keyword}</li>
            ))}
          </ul>
          <h3 style={{ textDecoration: 'underline' }}>Meanings:</h3>
          <ul>
            {card.light_meanings.map((meaning, index) => (
              <li key={index}>{meaning.light_meaning}</li>
            ))}
          </ul>
          <h3 style={{ textDecoration: 'underline' }}>Reversed Meanings:</h3>
          <ul>
            {card.shadow_meanings.map((meaning, index) => (
              <li key={index}>{meaning.shadow_meaning}</li>
            ))}
          </ul>
          <h3 style={{ textDecoration: 'underline' }}>Fortunes:</h3>
          <ul>
            {card.fortunes.map((fortune, index) => (
              <li key={index}>{fortune.fortune}</li>
            ))}
          </ul>
          <h3 style={{ textDecoration: 'underline' }}>Questions:</h3>
          <ul>
            {card.questions.map((question, index) => (
              <li key={index}>{question.question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;