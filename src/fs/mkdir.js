import fs from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";
import { log } from "../utils/colorConsole.js";

export const createDirectory = async (dirName, currentDir) => {
  try {
    const newDirPath = join(currentDir, dirName);
    try {
      await fs.promises.access(newDirPath);
      log.red(`Directory '${dirName}' already exists`);
    } catch (err) {
      await mkdir(newDirPath, { recursive: true });
      log.green(`Directory '${dirName}' was created successfully`);
    }
  } catch (error) {
    log.red(`Operation failed: ${error.message}`);
  }
};
