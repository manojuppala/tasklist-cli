import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import { homedir } from "os";
import { default as removeTask } from "./removeTask.js";

const STORAGE_PATH = homedir() + "/tasklist.json";
let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH));

export default async function viewTask() {
  let taskList = [];

  tasks.default.forEach((element) => {
    if (!element.status) {
      let dueDate = new Date(element.date);
      let today = new Date();
      taskList.push({
        value: element.id,
        name:
          element.name +
          " " +
          (today <= dueDate
            ? chalk.green(
                dueDate.toLocaleTimeString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              )
            : chalk.red(
                dueDate.toLocaleTimeString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              )),
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

    if (viewTasks.selectTask !== `${chalk.red("❌ cancel")}`) {
      await removeTask(viewTasks.selectTask);
    } else if (viewTasks.selectTask === `${chalk.red("❌ cancel")}`) {
      console.clear();
      console.log(`No task Choosen.`);
    }
  } else {
    console.clear();
    console.log(`No tasks are marked todo.`);
  }
}
