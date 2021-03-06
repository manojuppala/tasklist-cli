import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { createSpinner } from "nanospinner";
import { homedir } from "os";
import { default as remove } from "./remove.js";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));

type taskType = {
  id: number;
  name: string;
  status: boolean;
  date: string;
};

// function to add tasks to donetask list.
export default async function done(
  config: configType,
  proj: string = config?.default ?? "default"
) {
  const cancel = `${config?.emoji ?? true ? "❌ " : ""}cancel`;
  const clearAll = `${config?.emoji ?? true ? "🗑️ " : ""}clear all`;

  if (Object.keys(tasks).includes(proj)) {
    let taskList = [];
    tasks[proj].forEach((task: taskType) => {
      if (task.status) {
        taskList.push({ value: task.id, name: task.name });
      }
    });
    if (taskList.length) {
      taskList.push(new inquirer.Separator());
      taskList.push(`${chalk.yellow(clearAll)}`);
      taskList.push(`${chalk.red(cancel)}`);

      const doneTasks = await inquirer.prompt({
        name: "selectTask",
        type: "list",
        prefix: config?.emoji ?? true ? "✅" : undefined,
        message: "Done tasks list",
        choices: taskList,
        pageSize: taskList.length,
      });

      if (doneTasks.selectTask === `${chalk.yellow(clearAll)}`) {
        console.clear();
        const spinner = createSpinner("Clearing tasks...").start();
        await sleep(1000);
        for (let i = 0; i < tasks[proj].length; i++) {
          if (tasks[proj][i].status) {
            tasks[proj].splice(i, 1);
            i--;
          }
        }
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
        spinner.success({ text: `All tasks have been cleared` });
      } else if (doneTasks.selectTask === `${chalk.red(cancel)}`) {
        console.clear();
        console.log(`No task Selected.`);
      } else {
        await remove(config, doneTasks.selectTask, proj);
      }
    } else {
      console.clear();
      console.log(
        `No tasks are marked ${config?.emoji ?? true ? "✅" : ""}done.`
      );
    }
  } else {
    console.log(`${chalk.red(proj)}: No such project.`);
  }
}
