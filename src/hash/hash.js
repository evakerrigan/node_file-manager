import fs from "fs";
import crypto from "crypto";
import { log } from "../utils/colorConsole/colorConsole.js";

export const calcHash = (filePath) => {
  log.cyan("hash запускаем hash");
  console.log('filePath = ', filePath);

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
};