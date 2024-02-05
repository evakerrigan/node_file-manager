import fs from "fs";
import crypto from "crypto";
import { log } from "../utils/colorConsole/colorConsole.js";

export const calcHash = (filePath) => {
  log.cyan("hash запускаем hash");

  if (!fs.existsSync(filePath)) {
    log.red("Файл не существует");
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
      log.red(`Ошибка при чтении файла: ${err}`);
    });
  } catch (err) {
    log.red(`Ошибка при создании потока чтения файла: ${err}`);
  }
};