import React, {useState, useEffect} from 'react'
import TarotCard from '../components/TarotCard'

export default function Deck() {
  const [tarotCards, setTarotCards] = useState([]);

  useEffect(() => {
    //fetches all tarot cards and saves them to React state to be used for rendering
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
  }, [])
  
  if (!tarotCards) {
    return <div>🔮Loading...🔮</div>
  }

  return (
    <div className='deck-page'>
      <div className='title'>
        <h1>The Deck</h1>
      </div>
      <div className='deck-container'>
        {tarotCards.map(card => (
          <TarotCard key={card.id} card={card}/>
        ))}
      </div>
    </div>
  )
}
