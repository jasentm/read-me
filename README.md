# Read Me 🔮
Join us in the techno-mystica: Learn how to read tarot cards through fun, interactive, and effective lessons, view any card at any time to refresh your memory on its meaning, and get your own tarot card readings.

---

## Introduction
- A user can log in to view their own personal progress/profile (and stay logged in with Flask-Login)
- A user can take dynamically generated lessons to expand their learning with reading tarot cards
- A user can view all tarot cards and learn more about each one
- A user can get a three-card reading and save it to their profile to view later

## Instructions to Run
- A NOTE: To utilize the AI function, you must be running Python 3.9 or later AND have an API Key for Google Gemini
- To install front-end dependencies, run: npm install inside the client folder
- To install back-end dependencies, run: pipenv install inside the server folder
- To initialize the database, run: flask db init
- To migrate the database, run: flask db migrate -m 'initial migrate'
- To finish setting up the database, run: flask db upgrade head
- To populate the databases with necessary information: python seed.py
- To start the server: python app.py
- To start the front-end, run: npm run dev from the client folder

## Stretch Goals
- Add music
- Add Celtic Cross Spread as a reading a user can get
- Integrate AI for a more "human" reading
- Expand lessons to include difficulty levels, multiple types of input, and varied questions
- Game elements (deck builder, RPG, "side quests" to learn about individual cards)
- Some type of narrative structure
- Something hidden and fun for users to find (color changer, about page, a small game?)


## Wireframe 

https://www.figma.com/design/xISGYeKuyy1RUjIfNT2xQu/Untitled?node-id=0%3A1&t=IUQG3OcybUZQoV9a-1

## React Routes 
<img src="planning/React Routes.png" alt="routes">

## React Component Tree

<img src="planning/Component Tree.png" alt="components">

## Database Schema
<img src="planning/Database Schema.png" alt="schema">


## API Routes
<img src="planning/API Routes.png" alt="api">

## Kanban Board
<img src="planning/Kanban Board.png" alt="kanban">

## Acknowledgements 
The original version of the Rider–Waite Tarot is in the public domain in all countries that have a copyright term of 70 years or fewer after the death of the last co-author.

All data and images of the Rider-Waite Tarot was used under the MIT License from Daria Chemkaeva's open source project found here: https://www.kaggle.com/datasets/lsind18/tarot-json

Background designed by Freepik

Sounds:

-Card shuffling.mp3 by SomeoneCool15 -- https://freesound.org/s/423767/ -- License: Creative Commons 0
-Correct.mp3 by LittleRainySeasons -- https://freesound.org/s/335908/ -- License: Creative Commons 0
-Failure 01 by rhodesmas -- https://freesound.org/s/342756/ -- License: Attribution 3.0
-paper and hand by pauliperez1999 -- https://freesound.org/s/428740/ -- License: Attribution 3.0
