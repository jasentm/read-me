import React from 'react';
import './TarotCard.css';

const TarotCard = ({ card, handleCardClick, isReversed, isSelected }) => {
  const onCardClick = () => {
    handleCardClick(card);
  };

  return (
    <div 
      className={`tarot-card ${isSelected ? 'selected' : ''}`} 
      onClick={onCardClick} 
      style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
    >
      <img src={card.image} alt={card.name} />
    </div>
  );
};

export default TarotCard;