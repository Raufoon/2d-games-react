// eslint-disable-next-line
import Worker from "worker-loader!../../Worker/index.js";
import Logger from '../Logger';

class GameWorker {
  static instance;

  constructor() {
    throw new Error("Call GameWorker.getInstance to use this worker");
  }

  static getInstance() {
    if (!GameWorker.instance) {
      if (!window.Worker) {
        throw new Error("Web workers not supported");
      }
      GameWorker.instance = new Worker();
      GameWorker.instance.onmessage = this.onMessage;
      Logger.showSuccess('GameWorker loaded!');
    }
    return GameWorker.instance;
  }

  onMessage(event) {

  }

  postMessage(msg) {
    GameWorker.instance.postMessage(msg);
  }
}

export default GameWorker;
