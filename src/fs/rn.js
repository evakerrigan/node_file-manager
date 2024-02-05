import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rn = (oldFileName, newFileName, currentDir) => {
  const oldFilePath = path.join(currentDir, oldFileName);
  const newFilePath = path.join(currentDir, newFileName);
  log.cyan("run rn");
  try {
    if (fs.existsSync(oldFilePath)) {
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) throw err;
        log.green(`${oldFileName} has been successfully renamed to ${newFileName}`);
      });
    } else {
      log.red(`${oldFileName} does not exist in the directory!`);
    }
  } catch (err) {
    log.red(`Error renaming the file: ${err}`);
  }
};