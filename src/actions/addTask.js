import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import { homedir } from "os";

// create tasklist.json if dosent exist already
const default_data = { list: [] };
const STORAGE_PATH = homedir() + "/tasklist.json";
if (!fs.existsSync(STORAGE_PATH)) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
}

let data = JSON.parse(fs.readFileSync(STORAGE_PATH));

export default async function addTask() {
  const newTask = await inquirer.prompt({
    name: "newTask",
    type: "input",
    message: "task name",
    default() {
      return "new task";
    },
  });
  if (data.list.length === 0) {
    data.list.push({
      id: 0,
      name: newTask.newTask,
      status: false,
    });
  } else {
    data.list.push({
      id: data.list.slice(-1)[0].id + 1,
      name: newTask.newTask,
      status: false,
    });
  }
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
  console.clear();
  console.log(`new task ${chalk.yellow(newTask.newTask)} created.`);
}
