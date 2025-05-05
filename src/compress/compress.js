import fs from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole.js";
import { join, dirname, basename } from "path";

export const compressBrotli = async (startPath, endPath) => {
  log.cyan("run compress");

  try {
    if (!fs.existsSync(startPath)) {
      log.red(`Error: Source file '${startPath}' does not exist.`);
      return;
    }

    const stats = fs.statSync(startPath);
    if (!stats.isFile()) {
      log.red(`Error: '${startPath}' is not a file.`);
      return;
    }

    const endPathWithExt = endPath.endsWith(".br") ? endPath : `${endPath}.br`;

    const outputDir = dirname(endPathWithExt);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const readStream = fs.createReadStream(startPath);
    const writeStream = fs.createWriteStream(endPathWithExt);
    const brotliCompress = createBrotliCompress();

    await pipeline(readStream, brotliCompress, writeStream);
    log.green(`File compressed and written to ${endPathWithExt}`);
  } catch (err) {
    log.red(`Compression failed: ${err.message}`);
  }
};
