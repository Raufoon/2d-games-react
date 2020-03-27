// eslint-disable-next-line
import Worker from "worker-loader!./worker.js";
import Game from '../framework/Game.js';
import {FACE, COMMANDS} from './constants.js';
import Logger from '../../Logger';

const {UP, DOWN, LEFT, RIGHT} = FACE;
const {SYNC_GAME_STATE, CHANGE_FACE, START_WORKER, STOP_WORKER} = COMMANDS;
const {SYNC_RESULT_STATE, GET_KILLED, PAINT_GAME_DOTS} = COMMANDS;

class SnakeGame extends Game {
  constructor(id, gameCanvas, resultCanvas, onEnd) {
    super(id, gameCanvas, resultCanvas, onEnd);

    this.gameCanvasProps = {
      ...super.gameCanvasProps,
      dotSize: 10,
      width: 500,
      height: 500,
      relativeWidth: 50,
      relativeHeight: 50,
      color: '#1e6649'
    }

    this.resultCanvasProps = {
      ...super.resultCanvasProps,
      dotSize: 10,
      width: 400,
      height: 200,
      relativeWidth: 40,
      relativeHeight: 20,
      color: '#0e1103'
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

      case SYNC_RESULT_STATE:
        this.updateResultState(rest);
        break;

      case GET_KILLED:
        this.resultCanvasPainter.drawText("YOU DIED!!", 1, 10, {size: 40, color: 'red'});
        this.end();
        break;

      case PAINT_GAME_DOTS:
        const {dots} = rest;
        for (let i = 0; i < dots.length; i++) {
          const {x, y, color} = dots[i];
          this.gameCanvasPainter.drawDot(x, y, color);
        }
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

  renderResult() {
    const {score} = this.resultState;
    const {color} = this.resultCanvasProps;
    this.resultCanvasPainter.fillCanvas(color);
    this.resultCanvasPainter.drawText(`SCORE: ${score}`, 1, 1, {size: 30});
  }

  start() {
    super.start();

    this.updateResultState({score: 0})

    this.registerKeyListener("ArrowUp", this._onUpPressed);
    this.registerKeyListener("ArrowRight", this._onRightPressed);
    this.registerKeyListener("ArrowDown", this._onDownPressed);
    this.registerKeyListener("ArrowLeft", this._onLeftPressed);

    this.worker.postMessage({
      command: START_WORKER,
      gameState: this.gameState,
      resultState: this.resultState,
      gameCanvasProps: this.gameCanvasProps
    });
    Logger.showInfo("game started successfully");
  }

  end() {
    super.end();
    this.worker.postMessage({command: STOP_WORKER});
  }
}

export default SnakeGame;
