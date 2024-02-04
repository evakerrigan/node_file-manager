import fs from "fs";
import path from "path";
import { log } from "../utils/colorConsole/colorConsole.js";

export const cd = (currentDir, targetFolder) => {
  log.cyan("cd запускаем cd");

  if (!targetFolder) {
    log.red("cd Please provide the name of the folder to enter.");
  }

  const newDir = path.join(currentDir, targetFolder);
  console.log("cd newDir = ", newDir);

  if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
    process.chdir(newDir);
    log.green(`cd Successfully entered the folder: ${newDir}`);
    return newDir;
  } else {
    log.red(
      `cd The folder "${targetFolder}" does not exist in the current directory.`
    );
    return currentDir;
  }
};
