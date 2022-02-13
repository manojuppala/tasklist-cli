import chalk from "chalk";
import fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH));

// function to revoke or mark done a task.
export default async function removeTask(removedTaskId) {
  tasks.default.forEach((task) => {
    if (task.id === removedTaskId) {
      console.clear();
      task.status
        ? console.log(`Task ${chalk.yellow(task.name)} has been revoked.`)
        : console.log(`Task ${chalk.yellow(task.name)} is marked ✅ done.`);
      task.status = !task.status;
    }
  });
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
}
