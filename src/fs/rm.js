import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rm = (fileName, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  log.cyan("remove запускаем remove");
  try {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        log.green(`${fileName} был успешно удален из каталога ${currentDir}!`);
      });
    } else {
      log.red(`${fileName} не существует в каталоге!`);
    }
  } catch (err) {
    log.red(`Ошибка при удалении файла: ${err}`);
  }
};