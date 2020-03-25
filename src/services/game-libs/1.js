import Game from './util/Game.js';
import Logger from '../Logger';

class SnakeGame extends Game {
  constructor(gameCanvas, scoreCanvas, onExit) {
    super(gameCanvas, scoreCanvas, onExit);

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
  }
}

export default SnakeGame;
