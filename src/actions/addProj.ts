import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

export default async function addProj() {
  const newProj = await inquirer.prompt({
    name: "projName",
    type: "input",
    prefix: "📁",
    message: "Project name",
    default() {
      return "New project";
    },
  });
  console.clear();
  if (Object.keys(tasks).includes(newProj.projName)) {
    console.log(
      `${chalk.red("Project with name")} ${chalk.yellow(
        newProj.projName
      )} ${chalk.red("already exists!")}`
    );
  } else {
    tasks[newProj.projName] = [];
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
    console.log(`New project ${chalk.yellow(newProj.projName)} created.`);
  }
}
