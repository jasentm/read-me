import React from 'react';
import './TarotCard.css';

const TarotCard = ({ card, handleCardClick, isReversed, isSelected }) => {
  const onCardClick = () => {
    handleCardClick(card);
  };

  return (
    <div 
      className={`tarot-card ${isReversed ? 'reversed' : ''} ${isSelected ? 'selected' : ''}`} //changes CSS depending on if a card is reversed or not during a reading
      onClick={onCardClick} 
    >
      <img src={card.image} alt={card.name} />
    </div>
  );
};

export default TarotCard;