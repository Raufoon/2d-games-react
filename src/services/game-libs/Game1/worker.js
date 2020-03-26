/* eslint-disable */
import Logger from '../../Logger';
import {FACE, COMMANDS} from './constants.js';

const {UP, DOWN, LEFT, RIGHT} = FACE;
const {SYNC_GAME_STATE, CHANGE_FACE, START_WORKER, STOP_WORKER} = COMMANDS;

let gameState;
let gameCanvasProps;
let snakeMoverInterval;

function updateGameState(data, shouldSync=true) {
  gameState = {...gameState, ...data};
  if (shouldSync) postMessage({command: SYNC_GAME_STATE, ...data});
}

function moveSnake() {
  const {x, y} = gameState;
  const {relativeWidth, relativeHeight} = gameCanvasProps;

  switch (gameState.face) {
    case UP:
      if (y > 0) updateGameState({y: y - 1});
      break;

    case DOWN:
      if (y + 1 < relativeHeight) updateGameState({y: y + 1});
      break;

    case RIGHT:
      if (x + 1 < relativeWidth) updateGameState({x: x + 1});
      break;

    case LEFT:
      if (x > 0) updateGameState({x: x - 1});
      break;

    default:
  }
}

function startSnakeMover() {
  snakeMoverInterval = setInterval(moveSnake, 800);
}

function stopSnakeMover() {
  clearInterval(snakeMoverInterval);
}

function onMessage(event) {
  const {data} = event;
  const {command, ...rest} = data;

  Logger.showInfo(`MAIN -> WORKER: ${command}`, rest);

  switch (command) {
    case START_WORKER:
      gameState = rest.gameState;
      gameCanvasProps = rest.gameCanvasProps;
      startSnakeMover();
      break;

    case STOP_WORKER:
      stopSnakeMover();
      break;

    case CHANGE_FACE:
      stopSnakeMover();
      updateGameState(rest);
      moveSnake();
      startSnakeMover();
      break;

    default:
      throw new Error("Unrecognized worker command!");
  }
}

postMessage("Snake Worker: I have loaded!")

self.addEventListener('message', onMessage, false);
