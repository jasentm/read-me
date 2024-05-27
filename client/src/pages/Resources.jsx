import React from 'react';

const ResourceLinks = () => {
  const tarotDecks = [
    {
      name: 'Queer Tarot: An Inclusive Deck & Guidebook',
      creator: 'Ash + Chess',
      link: 'https://ashandchess.com/products/queer-tarot-an-inclusive-deck-guidebook',
    },
    {
      name: 'Next World Tarot',
      creator: 'Cristy C. Road',
      link: 'https://www.akpress.org/next-world-tarot.html',
    },
    {
        name: 'The Marigold Tarot',
        creator: '13th Press',
        link: 'https://13thpress.com/collections/decks-books/products/the-marigold-tarot-classic',
    },
  ];

  const shops = [
    {
      name: 'Earthtones Metaphysical Shop',
      description: 'Providence Rhode Island\'s only Queer, Black, Woman-owned Metaphysical Shop',
      link: 'https://www.earthtonesshop.com/',
    },
    {
      name: 'Bluestockings Cooperative',
      description: 'New York\'s only queer, trans AND sex worker run bookstore',
      link: 'https://bluestockings.com/browse/filter/t/tarot/k/keyword',
        
    },
    {
        name: 'Dreaming Goddess',
        description: 'Woman-owned and operated business since 1995, gathering crystals and metaphysical tools for you to heal, empower, and spread love.',
        link: 'https://dreaminggoddess.com/',
      },
  ];

  return (
    <div>
        <div className='resource-title' style={{paddingTop: 50}}>
            <h1>The Resources</h1>
        </div>
    <h3>Please look past the Rider-Waite Deck (illustrated by “Pixie” aka Pamela Colman Smith) to more inclusive decks and purchase from small businesses if possible.</h3>
    <h3>Obviously, this is not a complete list of resources, but just a start</h3>
      <h2 style={{paddingTop: 10}}>Modern/Inclusive Tarot Decks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tarotDecks.map((deck, index) => (
          <a
            key={index}
            href={deck.link}
            style={{ textDecoration: 'none', marginBottom: '0.5rem' }}
          >
            {deck.name} by <br/>{deck.creator}
          </a>
        ))}
      </div>

      <h2>Shops and Small Businesses</h2>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {shops.map((shop, index) => (
          <a
            key={index}
            href={shop.link}
            style={{ textDecoration: 'none', marginBottom: '0.8rem' }}
          >
            {shop.name} - <br/>{shop.description}
          </a>
        ))}
      </div>
      <h2>Modern/Inclusive Tarot Guidebooks</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a
            href='https://littleredtarot.com/product/all-of-our-stories-the-little-red-tarot-guidebook/'
            style={{ textDecoration: 'none', marginBottom: '0.5rem', paddingBottom: 140  }}
          >
            All of Our Stories: The Little Red Tarot Guidebook
          </a>
      </div>
    </div>
  );
};

export default ResourceLinks;
