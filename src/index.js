import { log } from "./utils/colorConsole/colorConsole.js";
import { homedir as homedirOs } from "os";
import { up } from "./nwd/up.js";
import { cd } from "./nwd/cd.js";
import { ls } from "./nwd/ls.js";
import { add } from "./fs/add.js";
import { rm } from "./fs/rm.js";
import { cat } from "./fs/cat.js";
import { rn } from "./fs/rn.js";
import { cp } from "./fs/cp.js";
import { mv } from "./fs/mv.js";
import { compressBrotli as compress } from "./compress/compress.js";
import { decompressBrotli as decompress } from "./compress/decompress.js";
import { calcHash as hash } from "./hash/hash.js";
import { EOL, architecture, cpus, homedir, username } from "./os/os.js";

const usernameCurrent = process.argv[2]
  ? process.argv[2].slice(11)
  : "Anonimous";
log.green(`Welcome to the File Manager, ${usernameCurrent}!`);

let currentDir = homedirOs();
export const greet = (directory) => {
  log.blue(`\nYou are currently in ${directory}`);
};
greet(currentDir);

const exit = () => {
  log.green(`Thank you for using File Manager, ${usernameCurrent}, goodbye!`);
  process.exit();
};

process.stdin.on("data", (data) => {
  const input = String(data).trim();
  if (input === ".exit") {
    exit();
  } else if (input.slice(0, 2) === "up") {
    currentDir = up(currentDir);
  } else if (input.slice(0, 2) === "cd") {
    const targetFolder = input.slice(3).trim();
    currentDir = cd(currentDir, targetFolder);
    greet(currentDir);
  } else if (input === "ls") {
    ls(currentDir);
    greet(currentDir);
  } else if (input.slice(0, 3) === "add") {
    const newFileName = input.slice(4).trim();
    add(newFileName, currentDir);
    greet(currentDir);
  } else if (input.slice(0, 2) === "rm") {
    const fileName = input.slice(3).trim();
    rm(fileName, currentDir);
    greet(currentDir);
  } else if (input.slice(0, 3) === "cat") {
    const fileName = input.slice(4).trim();
    cat(fileName, currentDir);
    greet(currentDir);
  } else if (input.slice(0, 4) === "hash") {
    const filePath = input.slice(5).trim();
    hash(filePath);
    greet(currentDir);
  } else if (input.slice(0, 8) === "compress") {
    const arrFiles = input.slice(9).split(" ");
    const startPath = arrFiles[0];
    const endPath = arrFiles[1];
    compress(startPath, endPath);
    greet(currentDir);
  } else if (input.slice(0, 10) === "decompress") {
    const arrFiles = input.slice(11).split(" ");
    const startPath = arrFiles[0];
    const endPath = arrFiles[1];
    decompress(startPath, endPath);
    greet(currentDir);
  } else if (input.slice(0, 2) === "cp") {
    const arrFiles = input.slice(3).split(" ");
    const filePath = arrFiles[0];
    const newDir = arrFiles[1];
    if (!newDir || !filePath || (newDir.trim() === filePath.trim())) {
      log.red("Invalid input: Please provide a new directory.");
      return;
    }
    cp(filePath, newDir);
    greet(currentDir);
  } else if (input.slice(0, 2) === "mv") {
    const arrFiles = input.slice(3).split(" ");
    const filePath = arrFiles[0];
    const newDir = arrFiles[1];
    if (!newDir || !filePath || (newDir.trim() === filePath.trim())) {
      log.red("Invalid input: Please provide a new directory.");
      return;
    }
    mv(filePath, newDir);
    greet(currentDir);
  } else if (input.slice(0, 2) === "rn") {
    const arrFiles = input.split(" ").slice(1);
    const oldFileName = arrFiles[0];
    const newFileName = arrFiles[1];
    rn(oldFileName, newFileName, currentDir);
    greet(currentDir);
  } else if (input.slice(0, 2) === "os") {
    const args = input.slice(3).trim();

    if (args.length === 0) {
      log.red("Invalid input: Please provide a command.");
    } else {
      switch (args) {
        case "--EOL":
          EOL();
          greet(currentDir);
          break;
        case "--cpus":
          cpus();
          greet(currentDir);
          break;
        case "--homedir":
          homedir();
          greet(currentDir);
          break;
        case "--username":
          username();
          greet(currentDir);
          break;
        case "--architecture":
          architecture();
          greet(currentDir);
          break;
        default:
          log.red("Invalid input: Command not recognized.");
      }
    }
  } else {
    log.red(`START Invalid input: ${input}. Enter another command:`);
  }
});

process.on("SIGINT", function () {
  exit();
});
