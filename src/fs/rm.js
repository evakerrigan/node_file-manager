import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rm = (fileName, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  log.cyan("run remove");

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red(`${fileName} does not exist in the directory!`);
      return;
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        log.red(`Error deleting the file: ${err}`);
        return;
      }
      log.green(`${fileName} has been successfully deleted from the directory ${currentDir}!`);
    });
  });
};