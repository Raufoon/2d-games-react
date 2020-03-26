/* eslint-disable */
import Logger from '../../Logger';
import {FACE, COMMANDS} from './constants.js';

const {UP, DOWN, LEFT, RIGHT} = FACE;
const {SYNC_GAME_STATE, CHANGE_FACE, START_WORKER, STOP_WORKER} = COMMANDS;
const {SYNC_RESULT_STATE, GET_KILLED} = COMMANDS;

let gameState;
let gameCanvasProps;
let snakeMoverInterval;
let resultState;

function random(max) {
  return parseInt(Math.random() * max, 10) + 1 ;
}

function updateResultState(data, shouldSync=true) {
  resultState = {...resultState, ...data};
  if (shouldSync) postMessage({command: SYNC_RESULT_STATE, ...data});
}

function updateGameState(data, shouldSync=true) {
  gameState = {...gameState, ...data};
  if (shouldSync) postMessage({command: SYNC_GAME_STATE, ...data});
}

function tryEatingFruit() {
  const {x, y, fruit} = gameState;
  const {relativeWidth, relativeHeight} = gameCanvasProps;

  if (fruit.x === x && fruit.y === y) {
    Logger.showInfo(`Snake Worker: ATE FRUIT!!!!`, undefined, 'red');

    updateGameState({
      fruit: {
        ...fruit,
        x: random(relativeWidth),
        y: random(relativeHeight),
      }
    });

    const {score} = resultState;
    updateResultState({score: score + 1});
  }
}

function getNextPosition() {
  const {x, y, face} = gameState;
  let position;

  switch (face) {
    case UP:
      position = {y: y - 1};
      break;

    case DOWN:
      position = {y: y + 1};
      break;

    case RIGHT:
      position = {x: x + 1};
      break;

    case LEFT:
      position = {x: x - 1};
      break;

    default:
      position = {x, y};
  }
  return position;
}

function getKilled() {
  stopSnakeMover();
  postMessage({command: GET_KILLED});
}

function moveSnake() {
  const {relativeWidth, relativeHeight} = gameCanvasProps;
  const nextPosition = getNextPosition();
  const {x, y} = nextPosition;

  if (x) {
    if (x < 0 || x == relativeWidth) {
      getKilled();
      return;
    }
  }

  if (y) {
    if (y < 0 || y == relativeHeight) {
      getKilled();
      return;
    }
  }

  updateGameState(nextPosition);
}

function startSnakeMover() {
  snakeMoverInterval = setInterval(() => {
    moveSnake();
    tryEatingFruit();
  }, 800);
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
      resultState = rest.resultState;
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

self.addEventListener('message', onMessage, false);
