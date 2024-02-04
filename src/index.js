import { log } from "./utils/colorConsole/colorConsole.js";
import { homedir as homedirOs } from "os";
import { up } from "./nwd/up.js";
import { cd } from "./nwd/cd.js";
import { ls } from "./nwd/ls.js";
import { add } from "./fs/add.js";
import { rm } from "./fs/rm.js";
import { cat } from "./fs/cat.js";
import { rn } from "./fs/rn.js";
import { EOL, architecture, cpus, homedir, username } from "./os/os.js";

const usernameCurrent = process.argv[2]
  ? process.argv[2].slice(11)
  : "Eva Kerrigan";
log.green(`Welcome to the File Manager, Username ${usernameCurrent}!`);

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
  } else if (input === "ls") {
    ls(currentDir);
  } else if (input.slice(0, 3) === "add") {
    const newFileName = input.slice(4).trim();
    add(newFileName, currentDir);
  } else if (input.slice(0, 2) === "rm") {
    const fileName = input.slice(3).trim();
    rm(fileName, currentDir);
  } else if (input.slice(0, 3) === "cat") {
    const fileName = input.slice(4).trim();
    cat(fileName, currentDir);
  } else if (input.slice(0, 2) === "rn") {
    const arrFiles = input.split(" ").slice(1);
    const oldFileName = arrFiles[0];
    const newFileName = arrFiles[1];
    rn(oldFileName, newFileName, currentDir);
  } else if (input.slice(0, 2) === "os") {
    const args = input.slice(3).trim();

    if (args.length === 0) {
      log.red("Invalid input: Please provide a command.");
    } else {
      switch (args) {
        case "--EOL":
          EOL();
          break;
        case "--cpus":
          cpus();
          break;
        case "--homedir":
          homedir();
          break;
        case "--username":
          username();
          break;
        case "--architecture":
          architecture();
          break;
        default:
          log.red("Invalid input: Command not recognized.");
      }
    }
  } else {
    log.red(`Invalid input: ${input}. Enter another command:`);
  }
});

process.on("SIGINT", function () {
  exit();
});
