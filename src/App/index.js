import React, { Suspense, lazy } from 'react';
import AppLogo from './components/AppLogo';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import './style.css';

const Game = lazy(() => import('./routes/Game'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppLogo size="10vmin"/>
        <Link to='/'>2D Games Online</Link>
      </header>

      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>,
            <Route path="/game/:id" component={Game}/>
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
