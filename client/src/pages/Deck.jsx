import React, { useState, useEffect } from 'react';
import TarotCard from '../components/TarotCard';
import PopupWindow from '../components/PopupWindow';
import { Button } from '@mui/material';
import {useSound} from 'use-sound';
import Shuffle from '/sounds/Shuffle.mp3'

export default function Deck() {
  const [tarotCards, setTarotCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [category, setCategory] = useState(0)

  useEffect(() => {
    // Fetches all tarot cards and saves them to React state to be used for rendering
    fetch(`http://localhost:5555/tarot-cards`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error('Something went wrong with your GET request');
        }
      })
      .then(data => {
        setTarotCards(data);
      })
      .catch(error => {
        console.error("Failed to fetch cards", error);
      });
  }, []);

  const filteredCards = tarotCards.filter(card => { //filter logic for category buttons
    return (category === 0 || card.suit == category)
  })

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  if (!tarotCards) {
    return <div>🔮Loading...🔮</div>;
  } else{ 

  return (
    <div className='deck-page'>
      <div className='title'>
        <h1>The Deck</h1>
      </div>
    <div>
      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory("Trump")}}
        sx={{ mt: -1, mb: 3, mr: 2, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          Major Arcana
        </Button>

      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory("Cups")}}
        sx={{ mt: -1, mb: 3, mr: 2, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          Cups
      </Button>
      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory("Swords")}}
        sx={{ mt: -1, mb: 3, mr: 2, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          Swords
      </Button>

      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory("Wands")}}
        sx={{ mt: -1, mb: 3, mr: 2, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          Wands
      </Button>

      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory("Pentacles")}}
        sx={{ mt: -1, mb: 3, mr: 2, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          Pentacles
      </Button>

      <Button 
        className='category-button '
        variant="contained" 
        onClick={() => { setCategory(0)}}
        sx={{ mt: -1, mb: 3, ml: 2, backgroundColor: '#1E5F22', fontFamily: 'cursive', '&:hover': {
          color: 'white'
        },}}>
          All
      </Button>
      </div>
      <div className='deck-container' style={{marginBottom: 150}}>
        {filteredCards.map(card => (
          <TarotCard
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedCard && ( //conditionally renders popup window with details about selected card
        <PopupWindow
          card={selectedCard}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
}