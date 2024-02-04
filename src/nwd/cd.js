import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cd = (currentDir, targetFolder) => {
  log.cyan("cd запускаем cd");

  if (!targetFolder) {
    log.red("cd Please provide the name of the folder to enter.");
    return currentDir;
  }

  const newDir = path.join(currentDir, targetFolder);

  try {
    if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
      process.chdir(newDir);
      log.green(`cd Successfully entered the folder: ${newDir}`);
      return newDir;
    } else {
      log.red(
        `cd The folder "${targetFolder}" does not exist in the current directory.`
      );
      return currentDir;
    }
  } catch (error) {
    log.red(`Operation failed: ${error.message}`);
    return currentDir;
  }
};
