import fs from "fs";
import path from "path"; 
import { log } from "../utils/colorConsole/colorConsole.js";

export const cat = (fileName, currentDir) => {
  const fullFilePath = path.join(currentDir, fileName);
  log.cyan("cat запускаем cat");
  try {
    if (fs.existsSync(fullFilePath)) {
      const readStream = fs.createReadStream(fullFilePath, { encoding: "utf8" });
      let data = "";
      readStream.on('data', (chunk) => {
        data += chunk; 
      });
      readStream.on('end', () => {
        log.green(`Содержимое файла ${fileName}:`);
        console.log(data); 
      });
    } else {
      log.red(`${fileName} не существует в каталоге!`);
    }
  } catch (err) {
    log.red(`Ошибка при чтении файла: ${err}`);
  }
};