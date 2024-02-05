import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const add = (newFileName, currentDir) => {
  log.cyan("run add");
  const filePath = path.join(currentDir, newFileName);
  try {
    fs.access(filePath, (err) => {
      if (!err) {
        log.red(`${newFileName} already exists in the directory!`);
      } else {
        fs.writeFile(filePath, "", (err) => {
          if (err) throw err;
          log.green(
            `${newFileName} has been successfully created in the directory ${currentDir}!`
          );
        });
      }
    });
  } catch (err) {
    log.red(`Error creating the file: ${err}`);
  }
};
