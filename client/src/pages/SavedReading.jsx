import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadingCard from '../components/ReadingCard'; 
import '../components/ReadingCard.css'; 

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

  const { past_card, present_card, future_card, past_card_reversed, present_card_reversed, future_card_reversed, past_card_meaning, present_card_meaning, future_card_meaning } = reading;

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
            <h2 className='meaning'>{past_card_meaning}</h2>
          </div>
        </div>
        <div className="saved-reading-section">
          <h2>Present</h2>
          <ReadingCard
            card={present_card}
            isReversed={present_card_reversed}
          />
          <div className="meaning-container">
            <h2 className='meaning'>{present_card_meaning}</h2>
          </div>
        </div>
        <div className="saved-reading-section">
          <h2>Future</h2>
          <ReadingCard
            card={future_card}
            isReversed={future_card_reversed}
          />
          <div className="meaning-container">
            <h2 className='meaning'>{future_card_meaning}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedReading;