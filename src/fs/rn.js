import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rn = (oldFileName, newFileName, currentDir) => {
  const oldFilePath = path.join(currentDir, oldFileName);
  const newFilePath = path.join(currentDir, newFileName);
  log.cyan("run rn");

  fs.access(oldFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red(`${oldFileName} does not exist in the directory!`);
      return;
    }

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        log.red(`Error renaming the file: ${err}`);
        return;
      }
      log.green(
        `${oldFileName} has been successfully renamed to ${newFileName}`
      );
    });
  });
};
