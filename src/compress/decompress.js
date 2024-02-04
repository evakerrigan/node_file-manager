import fs from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole/colorConsole.js";

export const decompressBrotli = async (startPath, endPath) => {
  log.cyan("decompress запускаем decompress");
  const readStream = fs.createReadStream(startPath);
  const writeStream = fs.createWriteStream(endPath);
  const brotliDecompress = createBrotliDecompress();

  try {
    await pipeline(readStream, brotliDecompress, writeStream);
    console.log(`File decompressed and written to ${endPath}`);
  } catch (err) {
    console.error("Decompression failed:", err);
  }
};