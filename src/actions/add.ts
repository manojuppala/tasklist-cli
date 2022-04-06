import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as inquirerDate from "inquirer-date-prompt";
import * as fs from "fs";
import { homedir } from "os";
import fileCheck from "./fileCheck";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

fileCheck();

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

inquirer.registerPrompt("date", inquirerDate as any);

// function to add new tasks to list.
export default async function add(
  config: configType,
  proj: string = config?.default ?? "default"
) {
  if (Object.keys(tasks).includes(proj)) {
    const newTask = await inquirer.prompt({
      name: "taskName",
      type: "input",
      prefix: config?.emoji ?? true ? "❓" : undefined,
      message: "Task name",
      default() {
        return "New task";
      },
    });
    const confirmDueDate = await inquirer.prompt({
      name: "dueDate",
      type: "confirm",
      prefix: config?.emoji ?? true ? "❓" : undefined,
      message: "Add due date",
      default() {
        return false;
      },
    });
    const taskDueDate = confirmDueDate.dueDate
      ? await inquirer.prompt({
          name: "dueDate",
          type: "date",
          prefix: config?.emoji ?? true ? "📅" : undefined,
          message: "Due date",
          default() {
            return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          },
        })
      : null;

    tasks[proj].push({
      id: tasks[proj].length === 0 ? 0 : tasks[proj].slice(-1)[0].id + 1,
      name: newTask.taskName,
      status: false,
      date: confirmDueDate.dueDate
        ? (taskDueDate as any).dueDate
        : "no due date",
      priority: null,
    });

    fs.writeFileSync(STORAGE_PATH, JSON.stringify(tasks));
    console.clear();
    console.log(
      `New task ${chalk.yellow(newTask.taskName)} created.` +
        (confirmDueDate.dueDate
          ? ` Due date: ${chalk.green(
              (taskDueDate as any).dueDate.toLocaleTimeString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            )}`
          : "")
    );
  } else {
    console.log(`${chalk.red(proj)}: No such project.`);
  }
}
