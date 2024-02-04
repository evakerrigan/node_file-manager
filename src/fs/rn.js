import fs from "fs";
import { log } from "../utils/colorConsole/colorConsole.js";
import path from "path";

export const rn = (oldFileName, newFileName, currentDir) => {
  const oldFilePath = path.join(currentDir, oldFileName);
  const newFilePath = path.join(currentDir, newFileName);
  log.cyan("rn запускаем rn");
  try {
    if (fs.existsSync(oldFilePath)) {
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) throw err;
        log.green(`${oldFileName} был успешно переименован в ${newFileName}`);
      });
    } else {
      log.red(`${oldFileName} не существует в каталоге!`);
    }
  } catch (err) {
    log.red(`Ошибка при переименовании файла: ${err}`);
  }
};