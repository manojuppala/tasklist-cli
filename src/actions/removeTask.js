import chalk from "chalk";
import fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/tasklist.json";
let data = JSON.parse(fs.readFileSync(STORAGE_PATH));

export default async function removeTask(removedTaskId) {
  data.list.forEach((element) => {
    if (element.id === removedTaskId) {
      if (element.status) {
        console.clear();
        console.log(`Task ${chalk.yellow(element.name)} has been revoked.`);
      } else if (!element.status) {
        console.clear();
        console.log(`Task ${chalk.yellow(element.name)} is marked ✅ done.`);
      }
      element.status = !element.status;
    }
  });
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
}
