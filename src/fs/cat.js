import fs from "fs";
import path from "path"; 
import { log } from "../utils/colorConsole/colorConsole.js";

export const cat = (fileName, currentDir) => {
  const fullFilePath = path.join(currentDir, fileName);
  log.cyan("run cat");
  try {
    if (fs.existsSync(fullFilePath)) {
      const readStream = fs.createReadStream(fullFilePath, { encoding: "utf8" });
      let data = "";
      readStream.on('data', (chunk) => {
        data += chunk; 
      });
      readStream.on('end', () => {
        log.green(`The content of the file ${fileName}:`);
        console.log(data); 
      });
    } else {
      log.red(`${fileName} does not exist in the directory!`);
    }
  } catch (err) {
    log.red(`Error reading the file: ${err}`);
  }
};