import * as chalk from "chalk";
import * as fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

type taskType = {
  id: number;
  name: string;
  status: boolean;
  date: string;
};

// function to revoke or mark done a task.
export default async function removeTask(removedTaskId: number) {
  tasks.default.forEach((task: taskType) => {
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
