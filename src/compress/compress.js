import fs from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { log } from "../utils/colorConsole.js";
import { join, dirname, basename } from "path";

export const compressBrotli = async (startPath, endPath) => {
  log.cyan("run compress");
  const endPathWithExt = endPath.endsWith(".br") ? endPath : `${endPath}.br`;

  const readStream = fs.createReadStream(startPath);
  const writeStream = fs.createWriteStream(endPathWithExt);
  const brotliCompress = createBrotliCompress();

  try {
    await pipeline(readStream, brotliCompress, writeStream);
    log.green(`File compressed and written to ${endPathWithExt}`);
  } catch (err) {
    log.red(`Compression failed: ${err.message}`);
  }
};
