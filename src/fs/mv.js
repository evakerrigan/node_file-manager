import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const mv = (filePath, newDir) => {
  log.cyan("run mv");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red(`${fileName} does not exist in the directory!`);
      return;
    }

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(newFilePath);
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      log.green(`${fileName} has been successfully moved to ${newDir}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          log.red(`Error deleting the file: ${err}`);
        }
      });
    });
    readStream.on("error", (err) => {
      log.red(`Error reading the file: ${err}`);
    });
    writeStream.on("error", (err) => {
      log.red(`Error writing the file: ${err}`);
    });
  });
};
