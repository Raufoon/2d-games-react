/* eslint-disable */
import Logger from '../../Logger';
import Snake from './Snake.js';
import {FACE, COMMANDS, FRUIT, SETTINGS} from './constants.js';

const {APPLE} = FRUIT;
const {MOVE_INTERVAL} = SETTINGS;
const {UP, DOWN, LEFT, RIGHT} = FACE;
const {SYNC_GAME_STATE, CHANGE_FACE, START_WORKER, STOP_WORKER} = COMMANDS;
const {SYNC_RESULT_STATE, GET_KILLED, PAINT_GAME_DOTS} = COMMANDS;

let gameState;
let gameCanvasProps;
let snakeMoverInterval;
let resultState;

function createRandomFruit() {
  const {relativeWidth, relativeHeight} = gameCanvasProps;

  let fruit;
  do {
    fruit = {
      ...APPLE,
      x: random(relativeWidth), // TODO:  will overlap with snake!!! fix
      y: random(relativeHeight),
    }

  } while (gameState.snake.isOnMyBody(fruit));

  return fruit;
}

function random(max) {
  return parseInt(Math.random() * max, 10) + 1 ;
}

function updateResultState(data, shouldSync=true) {
  resultState = {...resultState, ...data};
  if (shouldSync) postMessage({command: SYNC_RESULT_STATE, ...data});
}

function updateGameState(data) {
  gameState = {...gameState, ...data};
  Logger.showInfo('WORKER: Game State updated', gameState, 'brown');
}

function tryEatingFruit() {
  const {fruit, snake} = gameState;
  const {x, y} = snake.head;

  if (fruit.x === x && fruit.y === y) {
    Logger.showInfo(`Snake Worker: ATE FRUIT!!!!`, undefined, 'orange');

    snake.grow();

    const newFruit = createRandomFruit();
    updateGameState({fruit: newFruit});

    postMessage({
      command: PAINT_GAME_DOTS,
      dots: [newFruit, {...snake.head, color: snake.color}]
    })

    const {score} = resultState;
    updateResultState({score: score + 1});
  }
}

function getKilled() {
  stopSnakeMover();
  postMessage({command: GET_KILLED});
}

function moveSnake() {
  const {snake} = gameState;
  const {color} = gameCanvasProps;

  const erasedDot = {...snake.tail, color};

  snake.moveForward();
  if (snake.hasEatenMyself()) {
    Logger.showInfo(`Snake Worker: ATE MYSELF!`, undefined, 'red');
    getKilled();
    return;
  }

  const {relativeWidth, relativeHeight} = gameCanvasProps;

  const {x, y} = snake.head;
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

  Logger.showSuccess("Snake: ", [{...snake.tail}, ...snake.corners.map(corner => ({...corner})), {...snake.head}]);

  const newDot = {...snake.head, color: snake.color};
  postMessage({command: PAINT_GAME_DOTS, dots: [newDot, erasedDot]})
}

function startSnakeMover() {
  snakeMoverInterval = setInterval(() => {
    moveSnake();
    tryEatingFruit();

  }, MOVE_INTERVAL);
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
      let snake = new Snake(10, 10);
      let fruit = {x: 30, y: 30, ...APPLE};

      gameState = {...rest.gameState, snake, fruit};
      gameCanvasProps = rest.gameCanvasProps;
      resultState = rest.resultState;

      postMessage({command: PAINT_GAME_DOTS, dots: [fruit, ...snake.getAllDots()]});
      startSnakeMover();
      break;

    case STOP_WORKER:
      stopSnakeMover();
      break;

    case CHANGE_FACE:
      const {face} = rest;
      gameState.snake.changeFace(face);
      Logger.showSuccess("Snake: ", [{...gameState.snake.tail}, ...gameState.snake.corners.map(corner => ({...corner})), {...gameState.snake.head}]);
      break;

    default:
      throw new Error("Unrecognized worker command!");
  }
}

self.addEventListener('message', onMessage, false);
