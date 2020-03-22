class Logger {
  static log(msg, data, color) {
    const defaultStyle = 'font-weight: bold; font-family: "Lucida Console", Monaco, monospace;"';

    if (!data) {
      console.log(`%c ${msg}`, `color: ${color}; ${defaultStyle}`);
      return;
    }
    console.log(`%c ${msg}`, data, `color: ${color}; ${defaultStyle}`, `color: ${color};`);
  }

  static showInfo(msg, data) {
    Logger.log(msg, data, 'blue');
  }

  static showSuccess(msg, data) {
    Logger.log(msg, data, 'darkgreen');
  }
}

export default Logger;
