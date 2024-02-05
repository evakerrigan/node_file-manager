import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rm = (fileName, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  log.cyan("run remove");
  try {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        log.green(`${fileName} has been successfully deleted from the directory ${currentDir}!`);
      });
    } else {
      log.red(`${fileName} does not exist in the directory!`);
    }
  } catch (err) {
    log.red(`Error deleting the file: ${err}`);
  }
};