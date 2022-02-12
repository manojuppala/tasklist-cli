import chalk from "chalk";
import inquirer from "inquirer";
import inquirerDate from "inquirer-date-prompt";
import fs from "fs";
import { homedir } from "os";

// create tasklist.json if dosent exist already
const default_data = { default: [] };
const STORAGE_PATH = homedir() + "/tasklist.json";
if (!fs.existsSync(STORAGE_PATH)) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
}

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH));

inquirer.registerPrompt("date", inquirerDate);

export default async function addTask() {
  const newTask = await inquirer.prompt({
    name: "newTask",
    type: "input",
    message: "Task name",
    default() {
      return "new task";
    },
  });
  const confirmDate = await inquirer.prompt({
    name: "dueDate",
    type: "confirm",
    message: "Add due date",
    default() {
      return false;
    },
  });
  const taskDate = await inquirer.prompt({
    name: "dueDate",
    type: "date",
    message: "Due date",
    default() {
      return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    },
  });

  if (tasks.default.length === 0) {
    tasks.default.push({
      id: 0,
      name: newTask.newTask,
      status: false,
      date: taskDate.dueDate,
    });
  } else {
    tasks.default.push({
      id: tasks.default.slice(-1)[0].id + 1,
      name: newTask.newTask,
      status: false,
      date: taskDate.dueDate,
    });
  }
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
  console.clear();
  console.log(
    `New task ${chalk.yellow(newTask.newTask)} created. Due date: ${chalk.green(
      taskDate.dueDate.toLocaleTimeString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    )}`
  );
}
