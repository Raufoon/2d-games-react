import Logger from '../../Logger';
import Painter from './Painter.js';

class Game {
  constructor(gameCanvas, scoreCanvas, onExit) {
    this._onExit = onExit;
    this._keyListeners = {};

    this.gameCanvas = gameCanvas;
    this.gameCanvasProps = {
      dotSize: 5,
      width: 400,
      height: 400,
      color: 'black'
    }

    this.previousGameState = undefined;
    this.gameState = {
      isPaused: false,
      hasStarted: false,
      hasEnded: false
    };
  }

  _handleKeyEvent = (event) => {
    const key = event.code;

    if (key in this._keyListeners) {
      this._keyListeners[key]();
    }
  }

  updateGameState(data) {
    this.previousGameState = {...this.gameState};
    this.gameState = {...this.gameState, ...data};
    this.render();
  }

  render() {throw new Error("Subclass must implement render()")}

  registerKeyListener(key, listener) {
    this._keyListeners[key] = listener;
  }

  unregisterKeyListener(key) {
    delete this._keyListeners[key];
  }

  start() {
    const {width, height, dotSize, color} = this.gameCanvasProps;
    this.gameCanvasPainter = new Painter(this.gameCanvas, width, height, dotSize);
    this.gameCanvasPainter.fillCanvas(color);

    this.previousGameState = undefined;
    this.updateGameState({hasEnded: false, isPaused: false, hasStarted: true});

    document.addEventListener('keyup', this._handleKeyEvent);
  }

  pause() {
    this.updateGameState({isPaused: true});
    document.removeEventListener('keyup', this._handleKeyEvent);
  }

  resume() {
    this.updateGameState({isPaused: false});
    document.addEventListener('keyup', this._handleKeyEvent);
  }

  exit() {
    document.removeEventListener('keyup', this._handleKeyEvent);

    this.updateGameState({...this.initialGameState, hasEnded: true});
    this._keyListeners = {};
    this._onExit();
  }
}

export default Game;
