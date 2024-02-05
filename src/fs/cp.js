import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cp = (filePath, newDir) => {
  log.cyan("run cp");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red(`${fileName} does not exist!`);
      return;
    }

    fs.access(newDir, fs.constants.F_OK, (err) => {
      if (err) {
        log.red(`${newDir} does not exist!`);
        return;
      }

      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        log.green(`${fileName} has been successfully copied to ${newDir}`);
      });
      readStream.on("error", (err) => {
        log.red(`Error reading the file: ${err}`);
      });
      writeStream.on("error", (err) => {
        log.red(`Error writing the file: ${err}`);
      });
    });
  });
};
