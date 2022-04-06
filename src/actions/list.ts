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
export default async function list(
  config: configType,
  proj: string = config?.default ?? "default"
) {
  const cancel = `${config?.emoji ?? true ? "❌ " : ""}cancel`;

  if (Object.keys(tasks).includes(proj)) {
    let taskList = [];

    tasks[proj].forEach((task: taskType) => {
      if (!task.status) {
        taskList.push({
          value: task.id,
          name: task.name,
        });
      }
    });
    if (taskList.length) {
      taskList.push(new inquirer.Separator());
      taskList.push(`${chalk.red(cancel)}`);

      const listTasks = await inquirer.prompt({
        name: "selectTask",
        type: "list",
        prefix: config?.emoji ?? true ? "📝" : undefined,
        message: `Choose a task to mark done (${chalk.yellow(proj)})`,
        choices: taskList,
        pageSize: taskList.length,
      });

      if (listTasks.selectTask === `${chalk.red(cancel)}`) {
        console.clear();
        console.log(`No task Choosen.`);
      } else {
        await remove(config, listTasks.selectTask, proj);
      }
    } else {
      console.clear();
      console.log(
        `No tasks are marked ${
          config?.emoji ?? true ? "📝" : ""
        }todo in ${chalk.yellow(proj)}.`
      );
    }
  } else {
    console.log(`${chalk.red(proj)}: No such project.`);
  }
}
