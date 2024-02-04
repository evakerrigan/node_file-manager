import { log } from "./utils/colorConsole/colorConsole.js";
import { homedir } from "os";
import { up } from "./nwd/up.js";
import { cd } from "./nwd/cd.js";

const username = process.argv[2] ? process.argv[2].slice(11) : "Eva Kerrigan";
log.green(`Welcome to the File Manager, Username ${username}!`);

let currentDir = homedir();
export const greet = (directory) => {
  log.blue(`\nYou are currently in ${directory}`);
};
greet(currentDir);

const exit = () => {
  log.green(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

process.stdin.on("data", (data) => {
  const input = String(data).trim();
  if (input === ".exit") {
    exit();
  } else if (input.slice(0, 2) === "up") {
    currentDir = up(currentDir);
  } else if (input.slice(0, 2) === "cd") {
    console.log("currentDir = ", currentDir);
    const targetFolder = input.slice(3);
    currentDir = cd(currentDir, targetFolder);
  }
});

process.on("SIGINT", function () {
  exit();
});
