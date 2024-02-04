import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cp = (filePath, newDir) => {
  log.cyan("cp запускаем cp");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  try {
    if (fs.existsSync(filePath)) {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        log.green(`${fileName} был успешно скопирован в ${newDir}`);
      });
    } else {
      log.red(`${fileName} не существует в каталоге!`);
    }
  } catch (err) {
    log.red(`Ошибка при копировании файла: ${err}`);
  }
};
