import React from 'react';
import {withRouter} from 'react-router-dom';
import Logger from '../../../../../services/Logger';
import './style.css';

const fakeGetSetupData = () => Promise.resolve({
  id: 1,
  view: {
    width: 500,
    height: 500,
  },
  instructions: "Some instructions will be here"
});

class GamePlay extends React.Component {
  static initialState = {
    isLoading: false,
    isFailed: false,
    hasStarted: false,
    isPaused: false,
    hasEnded: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      ...GamePlay.initialState,
      isLoading: true,
      view: {
        width: 500,
        height: 200,
      }
    }
  }

  async _initGame() {
    try {
      const setupData = await fakeGetSetupData();
      const {id, view, instructions} = setupData;

      this.setState({view, instructions});
      this.game = await this._fetchGame(id);
      Logger.showSuccess("Game loaded", this.game);

    } catch (err) {
      this.setState({isLoading: false, isFailed: true});

    } finally {
      this.startGame();
    }
  }

  startGame = () => {
    this.setState({...GamePlay.initialState, hasStarted: true});
    this.game.start();
  }

  async _fetchGame(id) {
    const gameModule = await import(`../../../../../services/game-libs/Game${id}`);
    const onExit = () => this.setState({...GamePlay.initialState, hasEnded: true});
    const Game = gameModule.default;
    return new Game(id, this.gameCanvas, this.resultCanvas, onExit);
  }

  endGame = () => {
    this.setState({...GamePlay.initialState, hasEnded: true});
    this.game.end();
  }

  componentDidMount() {
    this._initGame();
  }

  componentWillUnmount() {
    this.game.exit();
  }

  render() {
    const {width, height} = this.state.view;
    const {isLoading, hasStarted, isFailed, hasEnded} = this.state;
    const {instructions} = this.state;

    return (
      <div className="GamePlay">

        <ul className="section">
          <li>
            <canvas className="gameCanvas" ref={el => this.gameCanvas = el} width={width} height={height}></canvas>
          </li>
          <li>
            <p>{instructions}</p>
          </li>
        </ul>

        <ul className="section">
          <li>
            {isLoading && <div className="message">Loading game :) Please wait!!!</div>}
            {hasStarted && <div className="message">Game running</div>}
            {isFailed && <div className="message">Failed to load game :(</div>}
            {hasEnded && <div className="message">Game Over!</div>}
          </li>
          <li>
            <canvas className="resultCanvas" ref={el => this.resultCanvas = el} width={300} height={200}></canvas>
          </li>
          <li>
            <div className="options">
              {hasStarted && <button onClick={this.endGame}>End</button>}
              {hasEnded && <button onClick={this.props.history.goBack}>Back to menu</button>}
              {hasEnded && <button onClick={this.startGame}>Play again</button>}
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(GamePlay);
