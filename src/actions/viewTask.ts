import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";
import { default as removeTask } from "./removeTask.js";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

type taskType = {
  id: number;
  name: string;
  status: boolean;
  date: string;
};

// function to view pending task list.
export default async function viewTask() {
  let taskList = [];

  tasks.default.forEach((task: taskType) => {
    if (!task.status) {
      taskList.push({
        value: task.id,
        name: task.name,
      });
    }
  });
  if (taskList.length) {
    taskList.push(new inquirer.Separator());
    taskList.push(`${chalk.red("❌ cancel")}`);

    const viewTasks = await inquirer.prompt({
      name: "selectTask",
      type: "list",
      message: "📝 Choose a task to mark ✅ done",
      choices: taskList,
      pageSize: taskList.length,
    });

    if (viewTasks.selectTask === `${chalk.red("❌ cancel")}`) {
      console.clear();
      console.log(`No task Choosen.`);
    } else {
      await removeTask(viewTasks.selectTask);
    }
  } else {
    console.clear();
    console.log(`No tasks are marked todo.`);
  }
}