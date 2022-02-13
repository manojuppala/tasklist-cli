import chalk from "chalk";
import inquirer from "inquirer";
import inquirerDate from "inquirer-date-prompt";
import fs from "fs";
import { homedir } from "os";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

// create /.tasklist/tasklist.json if dosent exist already
const default_data = { default: [] };
if (!fs.existsSync(STORAGE_PATH)) {
  fs.mkdirSync(homedir() + "/.tasklist");
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
}

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH));

inquirer.registerPrompt("date", inquirerDate);

// function to add new tasks to list.
export default async function addTask() {
  const newTask = await inquirer.prompt({
    name: "taskName",
    type: "input",
    message: "Task name",
    default() {
      return "new task";
    },
  });
  const confirmDueDate = await inquirer.prompt({
    name: "dueDate",
    type: "confirm",
    message: "Add due date",
    default() {
      return false;
    },
  });
  const taskDueDate = confirmDueDate.dueDate
    ? await inquirer.prompt({
        name: "dueDate",
        type: "date",
        message: "Due date",
        default() {
          return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        },
      })
    : null;

  tasks.default.push({
    id: tasks.default.length === 0 ? 0 : tasks.default.slice(-1)[0].id + 1,
    name: newTask.taskName,
    status: false,
    date: confirmDueDate.dueDate ? taskDueDate.dueDate : "no due date",
  });

  fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
  console.clear();
  console.log(
    `New task ${chalk.yellow(newTask.taskName)} created.` +
      (confirmDueDate.dueDate
        ? ` Due date: ${chalk.green(
            taskDueDate.dueDate.toLocaleTimeString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          )}`
        : "")
  );
}
