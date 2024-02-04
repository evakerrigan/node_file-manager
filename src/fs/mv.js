import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const mv = (filePath, newDir) => {
  log.cyan("mv запускаем mv");
  const fileName = path.basename(filePath);
  const newFilePath = path.join(newDir, fileName);

  try {
    if (fs.existsSync(filePath)) {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(newFilePath);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        log.green(`${fileName} был успешно перемещен в ${newDir}`);
        fs.unlinkSync(filePath);
      });
    } else {
      log.red(`${fileName} не существует в каталоге!`);
    }
  } catch (err) {
    log.red(`Ошибка при перемещении файла: ${err}`);
  }
};
