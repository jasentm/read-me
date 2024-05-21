import React from 'react';
import './TarotCard.css';

const TarotCard = ({ card, handleCardClick, isReversed, isSelected }) => {
  const onCardClick = () => {
    handleCardClick(card);
  };

  return (
    <div 
      className={`tarot-card ${isReversed ? 'reversed' : ''} ${isSelected ? 'selected' : ''}`} 
      onClick={onCardClick} 
    >
      <img src={card.image} alt={card.name} />
    </div>
  );
};

export default TarotCard;