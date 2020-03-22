import React from 'react';
import GameInfoCard from '../../components/GameInfoCard';
import './style.css';

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

const Home = (props) => {
  return (
    <div className='Home'>
      {
        fakeData.map(data =>
          <GameInfoCard key={data.id} className='gameInfoCard' {...data}/>)
      }
    </div>
  )
};

export default Home;
