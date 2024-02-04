import { greet } from "../index.js";
import { sep } from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const up = (currentDir) => {
  log.cyan(`up зашли в up`);
  const arrPath = currentDir.split(sep);

  if (arrPath.length <= 1) {
    log.red(`You are already in the root directory: ${currentDir}`);
    return currentDir;
  }

  const newArrPath = arrPath.slice(0, -1);
  const newPath = newArrPath.join(sep);

  process.chdir(newPath);

  greet(newPath);

  return newPath;

};
