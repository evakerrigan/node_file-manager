import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cd = (currentDir, targetFolder) => {
  log.cyan("run cd");

  if (!targetFolder) {
    log.red("cd Please provide the name of the folder to enter.");
    return currentDir;
  }

  try {
    const newDir = path.join(currentDir, targetFolder);
    process.chdir(newDir);
    log.green(`cd Successfully entered the folder: ${newDir}`);
    return newDir;
  } catch (error) {
    log.red(`Operation failed: ${error.message}`);
    return currentDir;
  }
};
