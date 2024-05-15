import React from 'react'
import './TarotCard.css'


const TarotCard = ({card, handleCardClick}) => {
    const onCardClick = () => {
        handleCardClick(card)
    }
    return (
    <div className="tarot-card" onClick={onCardClick}>
        {/* Image of the tarot card with alt text as the card's name for accessibility */}
        <img src={card.image} alt={card.name} />
    {/* Container for the card's name which should appear on hover (TODO item) */}
    {/* <div className="name-box"> */}
        {/* TODO: Uncomment and implement hover effect to display card name */}
        {/* <h2>{card.name}</h2> */}
    {/* </div> */}
    </div>
    )
}

export default TarotCard