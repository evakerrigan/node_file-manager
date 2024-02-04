import { readdir } from "fs/promises";
import { log } from "../utils/colorConsole/colorConsole.js";

export const ls = async (currentDir) => {
  log.cyan(`ls зашли в ls`);
  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    const displayFiles = files
      .map((el) => ({
        name: el.name,
        type: el.isFile() ? "file" : "directory",
      }))
      .sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        } else {
          return a.type === "directory" ? -1 : 1;
        }
      });
    console.table(displayFiles);
  } catch (error) {
    log.red(`Operation failed: ${error.message}`);
  }
};
