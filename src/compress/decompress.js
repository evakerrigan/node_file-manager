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
   
    if (!fs.existsSync(startPath)) {
      log.red(`Error: Source file '${startPath}' does not exist.`);
      return;
    }
    
    const stats = fs.statSync(startPath);
    if (!stats.isFile()) {
      log.red(`Error: '${startPath}' is not a file.`);
      return;
    }
   
    const outputDir = dirname(endPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
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
