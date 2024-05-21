import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TarotCard from '../components/TarotCard'; // Assuming TarotCard is in components folder

const shuffledDeck = (cards) => {
  let shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map(card => ({
    ...card,
    isReversed: Math.random() < 0.5,
    isSelected: false
  }));
};

export default function Readings() {
  const [showDeck, setShowDeck] = useState(false);
  const [tarotCards, setTarotCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // Fetch the tarot cards data
    fetch(`http://localhost:5555/tarot-cards`)
      .then(res => res.ok ? res.json() : console.error('Something went wrong with your GET request'))
      .then(data => setTarotCards(data))
      .catch(error => console.error("Failed to fetch cards", error));
  }, []);

  const handleShuffleDeck = () => {
    setShuffledCards(shuffledDeck(tarotCards));
    setShowDeck(true);
  };

  const handleCardSelect = (selectedCard) => {
    if (selectedCards.length < 3 && !selectedCards.includes(selectedCard)) {
      setShuffledCards(prevCards =>
        prevCards.map(card =>
          card.id === selectedCard.id ? { ...card, isSelected: true } : card
        )
      );
      setSelectedCards([...selectedCards, selectedCard]);
    }
  };

  return (
    <div className="lessons-page">
      <div className="content">
        {showDeck ? (
          <div className='deck-container'>
            {shuffledCards.map((card, index) => (
              <TarotCard
                key={index}
                card={{
                  ...card,
                  image: '/path/to/card-back.jpg', // TODO add card back image path
                }}
                handleCardClick={() => handleCardSelect(card)}
                isReversed={card.isReversed}
                isSelected={card.isSelected}
              />
            ))}
          </div>
        ) : (
          <>
            <div className='title' style={{ marginTop: -15 }}>
              <h1>The Readings</h1>
            </div>
            <div className='description-container'>
              <h2 className='description'>
                A three-card tarot spread unveils profound insights into your life's journey.
                <br /><br />The first card illuminates the experiences and lessons from the <span style={{ textDecorationLine: 'underline' }}>past</span> that shape your current reality.
                <br /><br />The second card reflects the energies and influences surrounding you in the <span style={{ textDecorationLine: 'underline' }}>present</span> moment.
                <br /><br />The third card unveils the potential <span style={{ textDecorationLine: 'underline' }}>futures</span> that await, guiding you towards your highest path.
                <br /><br />By interpreting the symbolism within each card, you unlock the hidden wisdom of the tarot, gaining profound self-discovery and enlightenment.
              </h2>
            </div>
            <Button 
              className='reading-button'
              variant="contained"
              sx={{ mt: 6, backgroundColor: '#1E5F22', fontFamily: 'cursive' }}
              onClick={handleShuffleDeck}
            >
              Get a Reading
            </Button>
          </>
        )}
      </div>
    </div>
  );
}