import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarotCard from '../components/TarotCard'; 

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

export default function Readings({user}) {
  const [showDeck, setShowDeck] = useState(false);
  const [tarotCards, setTarotCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate();

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

  const handleCardSelect = async (selectedCard) => {
    if (selectedCards.length < 3 && !selectedCards.includes(selectedCard)) {
      setShuffledCards(prevCards =>
        prevCards.map(card =>
          card.id === selectedCard.id ? { ...card, isSelected: true } : card
        )
      );
      const updatedSelectedCards = [...selectedCards, selectedCard];
      setSelectedCards(updatedSelectedCards);

      if (updatedSelectedCards.length === 3) {
        // Create a new Reading instance
        const response = await fetch(`http://localhost:5555/readings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            past_card_id: updatedSelectedCards[0].id,
            past_card_reversed: updatedSelectedCards[0].isReversed,
            present_card_id: updatedSelectedCards[1].id,
            present_card_reversed: updatedSelectedCards[1].isReversed,
            future_card_id: updatedSelectedCards[2].id,
            future_card_reversed: updatedSelectedCards[2].isReversed, //TODO think about meaning and if that's a patch request or created here
          })
        });
        console.log(response)
        if (response.ok) {
          const newReading = await response.json();
          // Navigate to the new reading page
          navigate(`/readings/${newReading.id}`);
        } else {
          console.error('Failed to create a new reading');
        }
      }
    }
  };

  return (
    <div className="readings-page">
      <div className="content">
        {showDeck ? (
          <>
            <div className='title' style={{ marginTop: 130 }}>
              <h1>Choose 3 Cards</h1>
            </div>
            <div className='deck-container'>
              {shuffledCards.map((card, index) => (
                <TarotCard
                  key={index}
                  card={{
                    ...card,
                    image: '/Back.png',
                  }}
                  handleCardClick={() => handleCardSelect(card)}
                  isReversed={card.isReversed}
                  isSelected={card.isSelected}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='title' style={{ marginTop: 50 }}>
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
