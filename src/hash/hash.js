import fs from "fs";
import crypto from "crypto";
import { log } from "../utils/colorConsole/colorConsole.js";

export const calcHash = (filePath) => {
  log.cyan("run hash");

  if (!fs.existsSync(filePath)) {
    log.red("File does not exist");
    return;
  }

  try {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(filePath);

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
  } catch (err) {
    log.red(`Error creating the file read stream: ${err}`);
  }
};