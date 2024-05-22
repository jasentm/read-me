import React from 'react';

const ReadingCard = ({ card, isReversed, isSelected }) => {
  if (!card) return null;

  const cardClasses = `saved-reading-card ${isReversed ? 'reversed' : ''} ${isSelected ? 'selected' : ''}`;

  return (
    <div className={cardClasses}>
      <img src={card.image} alt={card.name} />
    </div>
  );
};

export default ReadingCard;