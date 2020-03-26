import Game from '../framework/Game.js';
import {FACE, COMMANDS} from './constants.js';
// eslint-disable-next-line
import Worker from "worker-loader!./worker.js";
import Logger from '../../Logger';

const {UP, DOWN, LEFT, RIGHT} = FACE;
const {SYNC_GAME_STATE, CHANGE_FACE, START_WORKER, STOP_WORKER} = COMMANDS;

class SnakeGame extends Game {
  constructor(id, gameCanvas, scoreCanvas, onExit) {
    super(id, gameCanvas, scoreCanvas, onExit);

    const width = 500;
    const height = 500;
    const dotSize = 10;

    this.gameCanvasProps = {
      ...super.gameCanvasProps,
      dotSize,
      width,
      height,
      relativeWidth: width / dotSize,
      relativeHeight: height / dotSize,
      color: '#1e6649'
    }

    this.worker = new Worker();
    this.worker.onmessage = this.handleWorkerMsg;

    Logger.showSuccess("game init", this);
  }

  handleWorkerMsg = (event) => {
    const {data} = event;
    const {command, ...rest} = data;
    Logger.showInfo(`WORKER --> MAIN: ${command}`, data, '#ff7400');

    switch (command) {
      case SYNC_GAME_STATE:
        this.updateGameState(rest);
        break;

      default:
    }
  }

  _onUpPressed = () => {
    const {face} = this.gameState;
    if (face === UP || face === DOWN) return;

    const {y} = this.gameState;
    if (y === 0) return;

    this.worker.postMessage({command: CHANGE_FACE, face: UP});
  }

  _onDownPressed = () => {
    const {face} = this.gameState;
    if (face === UP || face === DOWN) return;

    const {y} = this.gameState;
    const {relativeHeight} = this.gameCanvasProps;
    if (y + 1 === relativeHeight) return;

    this.worker.postMessage({command: CHANGE_FACE, face: DOWN});
  }

  _onLeftPressed = () => {
    const {face} = this.gameState;
    if (face === LEFT || face === RIGHT) return;

    const {x} = this.gameState;
    if (x === 0) return;

    this.worker.postMessage({command: CHANGE_FACE, face: LEFT});
  }

  _onRightPressed = () => {
    const {face} = this.gameState;
    if (face === LEFT || face === RIGHT) return;

    const {x} = this.gameState;
    const {relativeWidth} = this.gameCanvasProps;
    if (x + 1 === relativeWidth) return;

    this.worker.postMessage({command: CHANGE_FACE, face: RIGHT});
  }

  render() {
    {
      const {x, y} = this.previousGameState;
      const {color} = this.gameCanvasProps;
      this.gameCanvasPainter.drawDot(x, y, color);
    }
    {
      const {x, y} = this.gameState;
      this.gameCanvasPainter.drawDot(x, y, 'yellow');
    }
  }

  start() {
    super.start();

    this.updateGameState({
      x: 1,
      y: 1,
      face: RIGHT
    });

    this.registerKeyListener("ArrowUp", this._onUpPressed);
    this.registerKeyListener("ArrowRight", this._onRightPressed);
    this.registerKeyListener("ArrowDown", this._onDownPressed);
    this.registerKeyListener("ArrowLeft", this._onLeftPressed);

    this.worker.postMessage({
      command: START_WORKER,
      gameState: this.gameState,
      gameCanvasProps: this.gameCanvasProps
    });

    Logger.showInfo("game started successfully");
  }

  end() {
    this.worker.postMessage({
      command: STOP_WORKER
    });
  }
}

export default SnakeGame;
