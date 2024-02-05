import fs from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole/colorConsole.js";

export const compressBrotli = async (startPath, endPath) => {
  log.cyan("run compress");
  const readStream = fs.createReadStream(startPath);
  const writeStream = fs.createWriteStream(endPath);
  const brotliCompress = createBrotliCompress();

  try {
    await pipeline(readStream, brotliCompress, writeStream);
    console.log(`File compressed and written to ${endPath}`);
  } catch (err) {
    console.error("Compression failed:", err);
  }
};