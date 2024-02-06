import { greet } from "../index.js";
import { sep } from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const up = (currentDir) => {
  log.cyan(`run up`);

  if (!currentDir) {
    log.red("Invalid input: Please provide the current directory.");
    return currentDir;
  }
  const arrPath = currentDir.split(sep);

  if (arrPath.length <= 1) {
    log.red(`You are already in the root directory: ${currentDir}`);
    return currentDir;
  }

  const newArrPath = arrPath.slice(0, -1);
  const newPath = newArrPath.join(sep);

  try {
    process.chdir(newPath);
    greet(newPath);
    return newPath;
  } catch (error) {
    log.red(`Operation failed: ${error.message}`);
    return currentDir;
  }
  
};
