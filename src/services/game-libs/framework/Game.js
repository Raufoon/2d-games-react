import Logger from '../../Logger';
import Painter from './Painter.js';

class Game {
  constructor(id, gameCanvas, resultCanvas, onExit) {
    this._onExit = onExit;
    this._keyListeners = {};
    this.id = id;

    this.gameCanvas = gameCanvas;
    this.gameCanvasProps = {}

    this.resultCanvas = resultCanvas;
    this.resultCanvasProps = {}

    this.previousGameState = undefined;
    this.gameState = {
      isPaused: false,
      hasStarted: false,
      hasEnded: false
    };

    this.resultState = {}
  }

  _handleKeyEvent = (event) => {
    const key = event.code;

    if (key in this._keyListeners) {
      Logger.showInfo(`~~~~~~~${key} pressed~~~~~~~`, undefined, 'crimson');
      this._keyListeners[key]();
    }
  }

  updateGameState(data, shouldRender=true) {
    this.previousGameState = {...this.gameState};
    this.gameState = {...this.gameState, ...data};

    Logger.showInfo("game state updated", {previous: this.previousGameState, current: this.gameState});
    if (shouldRender) this.renderGame();
  }

  updateResultState(data, shouldRender=true) {
    this.resultState = {...this.resultState, ...data};

    Logger.showInfo("result state updated", {result: this.resultState});
    if (shouldRender) this.renderResult();
  }

  renderGame() {throw new Error("Subclass must implement renderGame()")}

  renderResult() {throw new Error("Subclass must implement renderResult()")}

  registerKeyListener(key, listener) {
    this._keyListeners[key] = listener;
  }

  unregisterKeyListener(key) {
    delete this._keyListeners[key];
  }

  start() {
    {
      const {width, height, dotSize, color} = this.gameCanvasProps;
      this.gameCanvasPainter = new Painter(this.gameCanvas, width, height, dotSize);
      this.gameCanvasPainter.fillCanvas(color);
    }

    {
      const {width, height, dotSize, color} = this.resultCanvasProps;
      this.resultCanvasPainter = new Painter(this.resultCanvas, width, height, dotSize);
      this.resultCanvasPainter.fillCanvas(color);
    }

    this.previousGameState = undefined;
    this.updateGameState({hasEnded: false, isPaused: false, hasStarted: true}, false);

    document.addEventListener('keyup', this._handleKeyEvent);
  }

  pause() {
    this.updateGameState({isPaused: true}, false);
    document.removeEventListener('keyup', this._handleKeyEvent);
  }

  resume() {
    this.updateGameState({isPaused: false}, false);
    document.addEventListener('keyup', this._handleKeyEvent);
  }

  end() {
    document.removeEventListener('keyup', this._handleKeyEvent);
    this.updateGameState({...this.initialGameState, hasEnded: true}, false);
    this._keyListeners = {};
  }

  exit() {
    if (this.worker) {
      this.worker.terminate();
      delete this.worker;
    }
    this._onExit();
  }
}

export default Game;
