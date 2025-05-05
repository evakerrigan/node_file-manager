import fs from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole.js";
import { dirname } from "path";

export const decompressBrotli = async (startPath, endPath) => {
  log.cyan("run decompress");

  try {
    if (!startPath.endsWith(".br")) {
      log.red(
        `Error: File '${startPath}' is not a compressed file. Expected .br extension.`
      );
      return;
    }

    try {
      await fs.promises.access(startPath);
    } catch (error) {
      log.red(`Error: Source file '${startPath}' does not exist.`);
      return;
    }

    const stats = await fs.promises.stat(startPath);
    if (!stats.isFile()) {
      log.red(`Error: '${startPath}' is not a file.`);
      return;
    }

    const outputDir = dirname(endPath);
    try {
      await fs.promises.access(outputDir);
    } catch (error) {
      await fs.promises.mkdir(outputDir, { recursive: true });
    }

    const readStream = fs.createReadStream(startPath);
    const writeStream = fs.createWriteStream(endPath);
    const brotliDecompress = createBrotliDecompress();

    await pipeline(readStream, brotliDecompress, writeStream);
    log.green(`File decompressed and written to ${endPath}`);
  } catch (err) {
    log.red(`Decompression failed: ${err.message}`);
  }
};
