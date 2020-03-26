import Logger from '../../Logger';

function onMessage(event) {
  const {data} = event;
  const {command, ...rest} = data;

  Logger.showInfo(`MAIN -> WORKER: ${command}`, rest);

  switch (command) {
    default:
      throw new Error("Unrecognized worker command!");
  }
}

postMessage("Snake Worker: I have loaded!")

// eslint-disable-next-line
self.addEventListener('message', onMessage, false);
