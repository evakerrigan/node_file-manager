import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cat = async (fileName, currentDir) => {
  const fullFilePath = path.join(currentDir, fileName);
  log.cyan("run cat");
  try {
    await fs.promises.access(fullFilePath);
    const readStream = fs.createReadStream(fullFilePath, { encoding: "utf8" });
    let data = "";
    readStream.on("data", (chunk) => {
      data += chunk;
    });
    readStream.on("end", () => {
      log.green(`The content of the file ${fileName}:`);
      console.log(data);
    });
  } catch (err) {
    log.red(`${fileName} does not exist in the directory!`);
  }
};
