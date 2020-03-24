import React, {Suspense, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';
import GameDetails from './routes/GameDetails';
import './style.css';

const GamePlay = lazy(() => import('./routes/GamePlay'));
const GameSettings = lazy(() => import('./routes/GameSettings'));

const fakeImgUrl = 'https://ae01.alicdn.com/kf/HTB1fItvXACWBuNjy0Faq6xUlXXaI/Snake-30X42-CM-nostalgia-vintage-kraft-paper-poster-no-frame-painting-tattoo-shop-wall-decoration.jpg_q50.jpg';
const fakeData = {
  id: 1,
  title: "Snake Game",
  posterUrl: fakeImgUrl
};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...fakeData,
    }
  }

  render() {
    const {title, posterUrl} = this.state;

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={`/game/:id/play`} component={GamePlay}/>
          <Route path={`/game/:id/settings`} component={GameSettings}/>
          <Route render={
            (props) => <GameDetails {...props} title={title} posterUrl={posterUrl}/>
          }/>
        </Switch>
      </Suspense>
    )
  }
}

export default Game;
