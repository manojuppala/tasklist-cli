import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

// create a new project.
const default_data = { default: [] };
if (!fs.existsSync(STORAGE_PATH)) {
  if (!fs.existsSync(homedir() + "/.tasklist"))
    fs.mkdirSync(homedir() + "/.tasklist");
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
}

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

export default async function addProj() {
  const newList = await inquirer.prompt({
    name: "listName",
    type: "input",
    message: "Project name",
    default() {
      return "New project";
    },
  });
  console.clear();
  if (Object.keys(tasks).includes(newList.listName)) {
    console.log(
      `${chalk.red("Project with name")} ${chalk.yellow(
        newList.listName
      )} ${chalk.red("already exists!")}`
    );
  } else {
    tasks[newList.listName] = [];
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
    console.log(`New project ${chalk.yellow(newList.listName)} created.`);
  }
}
