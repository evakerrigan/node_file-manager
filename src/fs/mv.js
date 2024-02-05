import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const mv = (filePath, newDir) => {
  log.cyan("run mv");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  try {
    if (fs.existsSync(filePath)) {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        log.green(`${fileName} has been successfully moved to ${newDir}`);
        fs.unlinkSync(filePath);
      });
    } else {
      log.red(`${fileName} does not exist in the directory!`);
    }
  } catch (err) {
    log.red(`Error moving the file: ${err}`);
  }
};
