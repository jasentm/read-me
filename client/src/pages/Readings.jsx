import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarotCard from '../components/TarotCard'; 
import {useSound} from 'use-sound';
import Shuffle from '/sounds/Shuffle.mp3'

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

const getRandomMeaning = (meanings) => {
  if (meanings.length === 0) return "";
  const randomIndex = Math.floor(Math.random() * meanings.length);
  return meanings[randomIndex].light_meaning || meanings[randomIndex].shadow_meaning;
};

export default function Readings({ user }) {
  const [showDeck, setShowDeck] = useState(false);
  const [tarotCards, setTarotCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [animateShuffle, setAnimateShuffle] = useState(false); // State for animation trigger
  const navigate = useNavigate();
  const [playShuffle] = useSound(Shuffle);

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
    playShuffle();
  };

  const handleReshuffleDeck = () => {
    handleShuffleDeck();
  
    setAnimateShuffle(true); // Trigger animation
    setTimeout(() => {
      setAnimateShuffle(false); // Reset animation after a delay
      setShuffledCards(shuffledDeck(tarotCards));
      setShowDeck(true);
      playShuffle();
    }, 1000);
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
        const pastMeaning = getRandomMeaning(updatedSelectedCards[0].isReversed ? updatedSelectedCards[0].shadow_meanings : updatedSelectedCards[0].light_meanings);
        const presentMeaning = getRandomMeaning(updatedSelectedCards[1].isReversed ? updatedSelectedCards[1].shadow_meanings : updatedSelectedCards[1].light_meanings);
        const futureMeaning = getRandomMeaning(updatedSelectedCards[2].isReversed ? updatedSelectedCards[2].shadow_meanings : updatedSelectedCards[2].light_meanings);

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
            past_card_meaning: pastMeaning,  // Send the selected meaning
            present_card_id: updatedSelectedCards[1].id,
            present_card_reversed: updatedSelectedCards[1].isReversed,
            present_card_meaning: presentMeaning,  // Send the selected meaning
            future_card_id: updatedSelectedCards[2].id,
            future_card_reversed: updatedSelectedCards[2].isReversed,
            future_card_meaning: futureMeaning  // Send the selected meaning
          })
        });

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
            <div className='title' style={{marginTop: 130}} >
              <h1>Choose 3 Cards</h1>
            </div>
            <div className={`deck-container ${animateShuffle ? 'shuffling' : ''}`}>
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
            <Button variant="contained" onClick={handleReshuffleDeck} sx={{ mb: 20, backgroundColor: '#1E5F22', fontFamily: 'cursive' }} >
                Reshuffle
              </Button>
          </>
        ) : (
          <>
            <div className='title' style={{top: 10}}>
              <h1>The Readings</h1>
            </div>
            <div className='description-container'>
              <h2 className='description' style={{padding: 70}}>
                A three-card tarot spread unveils profound insights into your life's journey.
                <br /><br />The first card illuminates the experiences and lessons from the <span style={{ textDecorationLine: 'underline' }}>past</span> that shape your current reality.
                <br /><br />The second card reflects the energies and influences surrounding you in the <span style={{ textDecorationLine: 'underline' }}>present</span> moment.
                <br /><br />The third card unveils the potential <span style={{ textDecorationLine: 'underline' }}>futures</span> that lie ahead, offering guidance for the path you are on.
              </h2>
              <Button variant="contained" onClick={handleShuffleDeck} sx={{ mt: 6, backgroundColor: '#1E5F22', fontFamily: 'cursive' }} >
                Shuffle the Deck
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
