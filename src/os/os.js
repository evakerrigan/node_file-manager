import os from "os";
import { log } from "../utils/colorConsole/colorConsole.js";

export const EOL = () => {
  log.yellow(`EOL: ${JSON.stringify(os.EOL)}`);
};

export const cpus = () => {
  const cpus = os.cpus();
  cpus.forEach((cpu, index) => {
    log.yellow(`CPU ${index + 1}: ${cpu.model} @ ${cpu.speed}GHz`);
  });
};

export const homedir = () => {
  log.yellow(`Homedir: ${os.homedir()}`);
};

export const username = () => {
  log.yellow(`Username: ${os.userInfo().username}`);
};

export const architecture = () => {
  log.yellow(`Architecture: ${os.arch()}`);
};
