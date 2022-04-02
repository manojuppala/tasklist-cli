import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

// function to remove a project
export default async function removeProj(proj: string) {
  if (Object.keys(tasks).includes(proj)) {
    delete tasks[proj];
    console.clear();
    const confirmDelete = await inquirer.prompt({
      name: "choice",
      type: "confirm",
      prefix: "❓",
      message: `Are you sure to delete "${proj}"?`,
      default() {
        return false;
      },
    });
    if (confirmDelete.choice) {
      console.log(
        `Project ${chalk.yellow(proj)} has been ${chalk.red("deleted.")}`
      );
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
    }
  } else {
    console.log(`${chalk.red(proj)}: No such project.`);
  }
}
