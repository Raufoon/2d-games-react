class Logger {
  static log(msg, data, color) {
    if (!data) {
      console.log(`%c ${msg}`, `color: ${color};`);
      return;
    }
    console.log(`%c ${msg}`, data, `color: ${color};`, `color: ${color};`);
  }

  static showInfo(msg, data) {
    Logger.log(msg, data, 'blue');
  }

  static showSuccess(msg, data) {
    Logger.log(msg, data, 'green');
  }
}

export default Logger;
