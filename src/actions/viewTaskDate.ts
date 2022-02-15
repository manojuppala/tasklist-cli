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

// function to view pending task list with date.
export default async function viewTaskDate() {
  let taskList = [];
  let sortDateArray = tasks.default;
  sortDateArray.sort(
    (a: taskType, b: taskType) => +new Date(a.date) - +new Date(b.date)
  );
  sortDateArray.forEach((element: taskType) => {
    if (!element.status) {
      let dueDate = new Date(element.date);
      let today = new Date();
      taskList.push({
        value: element.id,
        name:
          element.name +
          " " +
          (element.date !== "no due date"
            ? today <= dueDate
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
                )
            : `${chalk.yellow(element.date)}`),
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
