import React, {Suspense, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';
import GameDetails from './routes/GameDetails';
import './style.css';

const GamePlay = lazy(() => import('./routes/GamePlay'));
const GameSettings = lazy(() => import('./routes/GameSettings'));

const Game = (props) => {
  return (
    <Suspense fallback={() => 'Loading...'}>
      <Switch>
        <Route path={`/game/:id/play`} component={GamePlay}/>
        <Route path={`/game/:id/settings`} component={GameSettings}/>
        <Route component={GameDetails}/>
      </Switch>
    </Suspense>
  )
}

export default Game;
