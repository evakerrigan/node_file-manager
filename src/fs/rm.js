import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rm = (filePath, currentDir) => {
  //const filePath = path.join(currentDir, fileName);
  log.cyan("run remove");

  const newPath = path.isAbsolute(filePath)
  ? filePath
  : path.join(currentDir, filePath);

  fs.access(newPath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red(`${newPath} does not exist in the directory!`);
      return;
    }

    fs.unlink(newPath, (err) => {
      if (err) {
        log.red(`Error deleting the file: ${err}`);
        return;
      }
      log.green(`${newPath} has been successfully deleted!`);
    });
  });
};