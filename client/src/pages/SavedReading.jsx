import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadingCard from '../components/ReadingCard'; 
import '../components/ReadingCard.css'; 

const getRandomMeaning = (meanings) => {
  if (meanings.length === 0) return "";
  const randomIndex = Math.floor(Math.random() * meanings.length);
  return meanings[randomIndex].light_meaning || meanings[randomIndex].shadow_meaning;
};

const SavedReading = () => {
  const { id } = useParams();
  const [reading, setReading] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/saved-readings/${id}`)
      .then(res => res.ok ? res.json() : console.error('Something went wrong with your GET request'))
      .then(data => setReading(data))
      .catch(error => console.error("Failed to fetch reading", error));
  }, [id]);

  if (!reading) {
    return <div>Loading...</div>;
  }

  const { past_card, present_card, future_card, past_card_reversed, present_card_reversed, future_card_reversed } = reading;

  const pastMeaning = past_card_reversed
    ? getRandomMeaning(past_card.shadow_meanings)
    : getRandomMeaning(past_card.light_meanings);

  const presentMeaning = present_card_reversed
    ? getRandomMeaning(present_card.shadow_meanings)
    : getRandomMeaning(present_card.light_meanings);

  const futureMeaning = future_card_reversed
    ? getRandomMeaning(future_card.shadow_meanings)
    : getRandomMeaning(future_card.light_meanings);

  return (
    <div className="saved-reading-page">
      <div className="title">
        <h1>Your Reading</h1>
      </div>
      <div className="saved-reading-container">
        <div className="saved-reading-section">
          <h2>Past</h2>
          <ReadingCard
            card={past_card}
            isReversed={past_card_reversed}
          />
          <div className="meaning-container">
            <p className='meaning'>{pastMeaning}</p>
          </div>
        </div>
        <div className="saved-reading-section">
          <h2>Present</h2>
          <ReadingCard
            card={present_card}
            isReversed={present_card_reversed}
          />
          <div className="meaning-container">
            <p className='meaning'>{presentMeaning}</p>
          </div>
        </div>
        <div className="saved-reading-section">
          <h2>Future</h2>
          <ReadingCard
            card={future_card}
            isReversed={future_card_reversed}
          />
          <div className="meaning-container">
            <p className='meaning'>{futureMeaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedReading;
