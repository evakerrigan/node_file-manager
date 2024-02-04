import fs from 'fs';
import { log } from "../utils/colorConsole/colorConsole.js";

export const add = (newFileName) => {
  log.cyan("add запускаем add");
  try {
    fs.writeFile(newFileName, '', (err) => {
      if (err) throw err;
      console.log(`${newFileName} был успешно создан в текущем рабочем каталоге!`);
    }); 
  } catch (err) {
    log.red(`Ошибка при создании файла: ${ err }`);
  }
}
