class Logger {
  static log(msg, data, color) {
    const defaultStyle = 'font-weight: bold; font-family: "Lucida Console", Monaco, monospace;"';

    if (data) {
      console.log(`%c ${msg}`, `color: ${color}; ${defaultStyle}`, data);
    } else {
      console.log(`%c ${msg}`, `color: ${color}; ${defaultStyle}`);
    }
  }

  static showInfo(msg, data, color="blue") {
    Logger.log(msg, data, color);
  }

  static showSuccess(msg, data) {
    Logger.log(msg, data, 'darkgreen');
  }
}

export default Logger;
