import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Logger from '../../../../../services/Logger';
import './style.css';

const fakeGetSetupData = () => Promise.resolve({
  id: 1,
  view: {
    width: 500,
    height: 500,
  }
});

class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isFailed: false,
      isLoaded: false,
      isPaused: false,
      hasEnded: false,

      view: {
        width: 500,
        height: 200,
      }
    }
  }

  async _initGame() {
    try {
      const setupData = await fakeGetSetupData();
      const {id, view} = setupData;

      this.setState({view});
      this.game = await this._fetchGame(id);
      Logger.showSuccess("Game loaded", this.game);

    } catch (err) {
      this.setState({isLoading: false, isFailed: true});

    } finally {
      this.setState({isLoading: false, isLoaded: true});
      this.game.start();
    }
  }

  async _fetchGame(id) {
    const gameModule = await import(`../../../../../services/game-libs/${id}.js`);
    const onExit = () => this.setState({hasEnded: true});

    const Game = gameModule.default;
    return new Game(this.gameCanvas, this.scoreCanvas, onExit);
  }

  exitGame = () => {
    this.setState({hasEnded: true});
    this.game.exit();
  }

  componentDidMount() {
    this._initGame();
  }

  render() {
    const url = this.props.match.url;
    const {width, height} = this.state.view;
    const {isLoading, isFailed, hasEnded} = this.state;

    return (
      <div className="GamePlay">
        {isLoading && <div>Loading game :) Please wait!!!</div>}
        {isFailed && <div>Failed to load game :(</div>}
        {hasEnded && <div>Game Over!</div>}

        <canvas className="gameCanvas" ref={el => this.gameCanvas = el} width={width} height={height}></canvas>

        <canvas className="scoreCanvas" ref={el => this.scoreCanvas = el} width={width} height={100}></canvas>

        <button onClick={this.exitGame}>End</button>
      </div>
    )
  }
}

export default withRouter(GamePlay);
