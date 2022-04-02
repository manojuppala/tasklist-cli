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

// function to list pending tasks with date.
export default async function listDate(proj: string = "default") {
  if (Object.keys(tasks).includes(proj)) {
    let taskList = [];
    let sortDateArray = tasks[proj];
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

      const listTasks = await inquirer.prompt({
        name: "selectTask",
        type: "list",
        prefix: "📅",
        message: `Choose a task to mark done (${chalk.yellow(proj)})`,
        choices: taskList,
        pageSize: taskList.length,
      });

      if (listTasks.selectTask === `${chalk.red("❌ cancel")}`) {
        console.clear();
        console.log(`No task Choosen.`);
      } else {
        await remove(listTasks.selectTask, proj);
      }
    } else {
      console.clear();
      console.log(`No tasks are marked 📝todo in ${chalk.yellow(proj)}.`);
    }
  } else {
    console.log(`${chalk.red(proj)}: No such project.`);
  }
}
