import fs from 'fs';
import { log } from "../utils/colorConsole/colorConsole.js";
import path from 'path';

export const add = (newFileName, currentDir) => {
  log.cyan("add запускаем add");
  const filePath = path.join(currentDir, newFileName);
  try {
    fs.writeFile(filePath, '', (err) => {
      if (err) throw err;
      console.log(`${newFileName} был успешно создан в каталоге  ${currentDir}!`);
    }); 
  } catch (err) {
    log.red(`Ошибка при создании файла: ${ err }`);
  }
}
