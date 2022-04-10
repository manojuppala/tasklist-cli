import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";
import { default as remove } from "./remove.js";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

type taskType = {
  id: number;
  name: string;
  status: boolean;
  date: string;
};

// function to list pending tasks.
export default async function listAll(config: configType) {
  const cancel = `${config?.emoji ?? true ? "❌ " : ""}cancel`;

  let taskList = [];
  Object.keys(tasks).forEach((proj: string) => {
    tasks[proj].forEach((task: taskType) => {
      if (!task.status) {
        taskList.push({
          value: task.id + "&@^$%" + proj,
          name: task.name + ` (${chalk.blue(proj)})`,
        });
      }
    });
  });

  if (taskList.length) {
    taskList.push(new inquirer.Separator());
    taskList.push(`${chalk.red(cancel)}`);

    const listTasks = await inquirer.prompt({
      name: "selectTask",
      type: "list",
      prefix: config?.emoji ?? true ? "📝" : undefined,
      message: "Choose a task to mark done",
      choices: taskList,
      pageSize: taskList.length,
    });

    if (listTasks.selectTask === `${chalk.red(cancel)}`) {
      console.clear();
      console.log(`No task Choosen.`);
    } else {
      await remove(
        config,
        parseInt(listTasks.selectTask.split("&@^$%")[0]),
        listTasks.selectTask.split("&@^$%")[1]
      );
    }
  } else {
    console.clear();
    console.log(
      `No tasks are marked ${config?.emoji ?? true ? "📝" : ""}todo.`
    );
  }
}
