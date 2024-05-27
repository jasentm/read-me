import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles';

const HoverCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[5],
    },
  }));

const ResourceLinks = () => {
  const tarotDecks = [
    {
      name: 'Queer Tarot: An Inclusive Deck & Guidebook',
      creator: 'Ash + Chess',
      link: 'https://ashandchess.com/products/queer-tarot-an-inclusive-deck-guidebook',
      image: 'https://ashandchess.com/cdn/shop/products/ps-queertarotdeck2_1000x.jpg?v=1650370301'
    },
    {
      name: 'Next World Tarot',
      creator: 'Cristy C. Road',
      link: 'https://www.akpress.org/next-world-tarot.html',
      image: 'https://www.akpress.org/media/catalog/product/cache/1ec012b46cbfe4262fc94f3e95ab2d9c/n/e/nextworldtarotwee_72.jpg'
    },
    {
        name: 'The Marigold Tarot',
        creator: '13th Press',
        link: 'https://13thpress.com/collections/decks-books/products/the-marigold-tarot-classic',
        image: 'https://13thpress.com/cdn/shop/products/IMG_0118.jpg?v=1709593935'
    },
    {
        name: 'Star Spinner Tarot',
        creator: 'Trungles',
        link: 'https://www.trungles.com/star-spinner-tarot',
        image: 'https://m.media-amazon.com/images/I/51ctjhkWJRL._SY445_SX342_.jpg'
    },
    {
        name: 'Modern Witch Tarot Deck',
        creator: 'Lisa Sterle',
        link: 'https://www.lisasterle.com/mwt',
        image: 'https://images.squarespace-cdn.com/content/v1/5696664dc21b863e111f15ea/1554136263637-BJJRWDXEXBDQM1381PW3/modern-witch-tarot-cover.png?format=750w'
    },
    {name: 'All of Our Stories: The Little Red Tarot Guidebook',
    creator: 'Little Red Tarot',
    link: 'https://littleredtarot.com/product/all-of-our-stories-the-little-red-tarot-guidebook/',
    image: 'https://littleredtarot.com/wp-content/uploads/2020/08/All-of-Our-Stories.jpg'
    }
  ];

  const shops = [
    {
      name: 'Earthtones Metaphysical Shop',
      description: 'Providence Rhode Island\'s only Queer, Black, Woman-owned Metaphysical Shop',
      link: 'https://www.earthtonesshop.com/',
      image: 'https://static.wixstatic.com/media/eee20a_3a0daa45bac64af7bef9c3bf8cff5b49~mv2.png/v1/fill/w_666,h_888,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/IMG_1094_HEIC.png'
    },
    {
      name: 'Bluestockings Cooperative',
      description: 'New York\'s only queer, trans AND sex worker run bookstore',
      link: 'https://bluestockings.com/browse/filter/t/tarot/k/keyword',
      image: 'https://pyxis.nymag.com/v1/imgs/6bc/54f/c1b1d7c03b67551dfdb32ec3a44014d2b3-bluestockings-5.2x.rhorizontal.w700.jpg'
        
    },
    {
        name: 'Dreaming Goddess',
        description: 'Woman-owned and operated business since 1995, gathering crystals and metaphysical tools for you to heal, empower, and spread love.',
        link: 'https://dreaminggoddess.com/',
        image: 'https://dreaminggoddess.com/wp-content/uploads/2019/09/DGstorefront-400x300.jpg'
      },
  ];

  return (
    <div>
        <div className='resource-title' style={{paddingTop: 90}}>
            <h1>The Resources</h1>
        </div>
    <h3>Please look further than the Rider-Waite Deck (illustrated by “Pixie” aka Pamela Colman Smith) <br/>to more inclusive decks and purchase from small businesses if possible.</h3>
    <h3>Obviously, this is not a complete list of resources, but just a start</h3>

      <Typography variant="h4" gutterBottom sx={{fontFamily: 'cursive', textDecoration: 'underline', marginTop: 5}}>
        Modern Tarot Decks and Guidebooks
      </Typography>
      <Grid container spacing={2}>
        {tarotDecks.map((deck, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link href={deck.link} underline='none'>
                <HoverCard>
                <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={deck.image}
                    alt={deck.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'cursive'}}>
                    {deck.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    by {deck.creator}
                    </Typography>
                </CardContent>
                </Card>
                </HoverCard>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{fontFamily: 'cursive', textDecoration: 'underline', marginTop: 5}}>
        Shops and Small Businesses
      </Typography >
      <Grid container spacing={2}>
        {shops.map((shop, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{marginBottom: 13}}>
            <Link href={shop.link} underline='none'>
                <HoverCard>
                <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={shop.image}
                    alt={shop.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'cursive'}}>
                    {shop.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {shop.description}
                    </Typography>
                </CardContent>
                </Card>
                </HoverCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResourceLinks;