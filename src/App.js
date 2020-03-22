import React from 'react';
import logo from './logo.svg';
import AppLogo from './components/AppLogo';
import GameInfoCard from './components/GameInfoCard';
import './App.css';

const fakeImgUrl = 'https://ae01.alicdn.com/kf/HTB1fItvXACWBuNjy0Faq6xUlXXaI/Snake-30X42-CM-nostalgia-vintage-kraft-paper-poster-no-frame-painting-tattoo-shop-wall-decoration.jpg_q50.jpg';
const fakeData = [
  {
    id: 1,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 2,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 3,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 4,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 5,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 6,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 7,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
  {
    id: 8,
    title: "Snake Game",
    posterUrl: fakeImgUrl
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppLogo size="10vmin"/>
        <label>2D Games Online</label>
      </header>

      <main>
        {
          fakeData.map(data =>
            <GameInfoCard key={data.id} className='gameInfoCard' {...data}/>)
        }
      </main>
    </div>
  );
}

export default App;
