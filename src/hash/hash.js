import fs from "fs";
import crypto from "crypto";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const calcHash = (filePath, currentDir) => {
  log.cyan("run hash");

  const newfilePath = path.isAbsolute(filePath)
  ? filePath
  : path.join(currentDir, filePath);

  fs.access(newfilePath, fs.constants.F_OK, (err) => {
    if (err) {
      log.red("File does not exist");
      return;
    }  

    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(newfilePath);

    input.on("readable", () => {
      const data = input.read();
      if (data) {
        hash.update(data);
      } else {
        console.log(hash.digest("hex"));
      }
    });

    input.on("error", (err) => {
      log.red(`Error reading the file: ${err}`);
    });
  });
};