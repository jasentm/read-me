import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadingCard from '../components/ReadingCard';
import '../components/ReadingCard.css';
import AIPopup from '../components/AIPopup';

const SavedReading = () => {
  const { id } = useParams();
  const [reading, setReading] = useState(null);
  const [aiInterpretation, setAiInterpretation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReading(id);
  }, [id]);

  const fetchReading = (id) => {
    fetch(`http://localhost:5555/saved-readings/${id}`) //GET request to render saved reading data
      .then(res => res.ok ? res.json() : Promise.reject('Something went wrong with your GET request'))
      .then(data => setReading(data))
      .catch(error => console.error("Failed to fetch reading", error));
  };

  const handleAskAI = () => { //POST request to generate AI response based on meanings of tarot cards in reading
    const query = `Please synthesize the meaning of this tarot card reading with a maximum of 5 sentences: Past: ${reading.past_card_meaning} Present: ${reading.present_card_meaning} Future: ${reading.future_card_meaning}`;

    fetch('http://localhost:5555/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(err.error || 'Failed to fetch AI interpretation');
        });
      }
      return res.json();
    })
    .then(data => {
      setAiInterpretation(data.text);
      setError(null);
    })
    .catch(error => {
      console.error("Failed to get AI interpretation", error);
      setError('The AI model was unable to interpret this reading. It is possible that the response was blocked due to the AI safety ratings.'); //error handling if AI response does not come through
      setAiInterpretation(null);
    });
  };

  if (!reading) {
    return <div>Loading...</div>;
  }

  //destructuring reading 
  const { past_card, present_card, future_card, past_card_reversed, present_card_reversed, future_card_reversed, past_card_meaning, present_card_meaning, future_card_meaning } = reading;

  return (
    <div className="saved-reading-page">
      <div className="title" style={{paddingTop: '50px'}}>
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
      <div style={{ paddingBottom: '30px' }}>
        <button onClick={() => setShowPopup(true)}>Synthesize with AI</button>
        {showPopup && ( 
          <AIPopup //popup disclaimer window if a user clicks the Synthesize with AI button
            onConfirm={() => {
              handleAskAI();
              setShowPopup(false);
            }}
            onCancel={() => setShowPopup(false)}
          />
        )}
        {aiInterpretation && (
          <div className="ai-interpretation" style={{ paddingBottom: '100px' }}>
            <h1>Interpretation:</h1>
            <h2>{aiInterpretation}</h2>
          </div>
        )}
        {error && ( //error handling if AI response does not generate
          <div className="error-message" style={{ color: 'red', paddingBottom: '100px' }}>
            <h2>{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedReading;
