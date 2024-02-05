import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cp = (filePath, newDir) => {
  log.cyan("run cp");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  try {
    if (fs.existsSync(filePath)) {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        log.green(`${fileName} has been successfully copied to ${newDir}`);
      });
    } else {
      log.red(`${fileName} does not exist in the directory!`);
    }
  } catch (err) {
    log.red(`Error copying the file: ${err}`);
  }
};
