class Game {
  constructor(gameCanvas, scoreCanvas, onExit) {
    this._onExit = onExit;
    this.reset();
  }

  reset() {
    this._keyListeners = [];
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
    this.reset();
  }
}

export default Game;
