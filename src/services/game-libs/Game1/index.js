import Game from '../framework/Game.js';
// eslint-disable-next-line
import Worker from "worker-loader!./worker.js";
import Logger from '../../Logger';

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
    Logger.showInfo("WORKER --> MAIN: ", data, '#ff7400');
  }

  _onUpPressed = () => {
    this.updateGameState({
      y: this.gameState.y - 1
    });
  }

  _onDownPressed = () => {
    this.updateGameState({
      y: this.gameState.y + 1
    });
  }

  _onLeftPressed = () => {
    this.updateGameState({
      x: this.gameState.x - 1
    });
  }

  _onRightPressed = () => {
    this.updateGameState({
      x: this.gameState.x + 1
    });
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
      y: 1
    });

    this.registerKeyListener("ArrowUp", this._onUpPressed);
    this.registerKeyListener("ArrowRight", this._onRightPressed);
    this.registerKeyListener("ArrowDown", this._onDownPressed);
    this.registerKeyListener("ArrowLeft", this._onLeftPressed);
    Logger.showInfo("game started successfully");
  }
}

export default SnakeGame;
