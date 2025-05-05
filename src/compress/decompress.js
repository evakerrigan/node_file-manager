import fs from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole.js";
// import { join, dirname, basename } from "path";

export const decompressBrotli = async (startPath, endPath) => {
  log.cyan("run decompress");

  if (!startPath.endsWith(".br")) {
    log.red(
      `Error: File '${startPath}' is not a compressed file. Expected .br extension.`
    );
    return;
  }

  const readStream = fs.createReadStream(startPath);
  const writeStream = fs.createWriteStream(endPath);
  const brotliDecompress = createBrotliDecompress();

  try {
    await pipeline(readStream, brotliDecompress, writeStream);
    log.green(`File decompressed and written to ${endPath}`);
  } catch (err) {
    log.red(`Decompression failed: ${err.message}`);
  }
};
