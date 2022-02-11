import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import { createSpinner } from "nanospinner";
import { homedir } from "os";
import { default as removeTask } from "./removeTask.js";

const STORAGE_PATH = homedir() + "/tasklist.json";
let data = JSON.parse(fs.readFileSync(STORAGE_PATH));

const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export default async function doneTask() {
  let taskList = [];
  data.list.forEach((element) => {
    if (element.status) {
      taskList.push({ value: element.id, name: element.name });
    }
  });
  taskList.push(new inquirer.Separator());
  taskList.push(`${chalk.yellow("🗑️ clear all")}`);
  taskList.push(`${chalk.red("❌ cancel")}`);

  const doneTasks = await inquirer.prompt({
    name: "selectTask",
    type: "list",
    message: "✅ Done tasks list",
    choices: taskList,
    pageSize: taskList.length,
  });

  if (doneTasks.selectTask === `${chalk.yellow("🗑️ clear all")}`) {
    console.clear();
    const spinner = createSpinner("Clearing tasks...").start();
    await sleep(1000);
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].status) {
        data.list.splice(i, 1);
        i--;
      }
    }
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
    spinner.success({ text: `All tasks have been cleared` });
  } else if (doneTasks.selectTask === `${chalk.red("❌ cancel")}`) {
    console.clear();
    console.log(`No option Selected.`);
  } else {
    await removeTask(doneTasks.selectTask);
  }
}
