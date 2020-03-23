class Game {
  constructor(gameCanvas, scoreCanvas, onExit) {
    this._keyListeners = [];
    this._onExit = onExit;
  }

  registerKeyListener(key, listener) {
    this._keyListeners.push({key, listener});
  }

  _unregisterAllKeyListeners() {

  }

  start() {}

  pause() {}

  resume() {}

  exit() {
    this._onExit();
    this._unregisterAllKeyListeners();
  }
}

export default Game;
