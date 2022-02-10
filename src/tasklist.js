#!/usr/bin/env node

import chalk from "chalk";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import fs from "fs";
import { homedir } from "os";
import yargs from "yargs";

const default_data = { list: [] };

const STORAGE_PATH = homedir() + "/todo-cli.json";

if (!fs.existsSync(STORAGE_PATH)) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
}

let data = JSON.parse(fs.readFileSync(STORAGE_PATH));

const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));

// func to display done tasks
async function doneTask() {
  let doneList = [];
  let revokeTask = [];
  let revokeId;
  data.list.forEach((element) => {
    if (element.status) {
      doneList.push(element.name);
      revokeTask.push(element.id);
    }
  });
  doneList.push(new inquirer.Separator());
  doneList.push(`${chalk.yellow("🗑️ clear all")}`);
  doneList.push(`${chalk.red("❌ cancel")}`);

  const doneTasks = await inquirer.prompt({
    name: "taskList",
    type: "list",
    message: "✅ Done tasks list",
    choices: doneList,
    pageSize: doneList.length,
  });

  if (doneTasks.taskList === `${chalk.yellow("🗑️ clear all")}`) {
    console.clear();
    const spinner = createSpinner("Clearing tasks...").start();
    await sleep(1000);
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].status) {
        data.list.splice(i, 1);
        i--;
      }
    }
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
    spinner.success({ text: `All tasks have been cleared` });
  } else if (doneTasks.taskList === `${chalk.red("❌ cancel")}`) {
    console.clear();
    console.log(`No option Selected.`);
  } else {
    for (let i = 0; i < doneList.length; i++) {
      if (doneTasks.taskList === doneList[i]) {
        revokeId = revokeTask[i];
        break;
      }
    }
    data.list.forEach((element) => {
      if (element.id === revokeId) {
        element.status = false;
        console.clear();
        console.log(`Task ${chalk.yellow(element.name)} has been revoked.`);
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
      }
    });
  }
}

//function to remove tasks from the list
async function removeTask(removedTaskId) {
  data.list.forEach((element) => {
    if (element.id === removedTaskId) {
      element.status = true;
      console.clear();
      console.log(`Task ${chalk.yellow(element.name)} is marked ✅ done.`);
    }
  });
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
}

// function to view all active tasks
async function viewTask() {
  let newList = [];
  let idList = [];
  data.list.forEach((element) => {
    if (!element.status) {
      newList.push(element.name);
      idList.push(element.id);
    }
  });
  newList.push(new inquirer.Separator());
  newList.push(`${chalk.red("❌ cancel")}`);
  const viewTasks = await inquirer.prompt({
    name: "taskList",
    type: "list",
    message: "📝 Choose a task to mark ✅ done",
    choices: newList,
    pageSize: newList.length,
  });

  if (viewTasks.taskList !== `${chalk.red("❌ cancel")}`) {
    for (let i = 0; i < newList.length; i++) {
      if (viewTasks.taskList === newList[i]) {
        await removeTask(idList[i]);
        break;
      }
    }
  } else if (viewTasks.taskList === `${chalk.red("❌ cancel")}`) {
    console.clear();
    console.log(`No task Choosen.`);
  }
}

// func to add new task
async function addTask() {
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

async function todoCli() {
  if (!yargs.argv._[0]) {
    figlet("todo - cli", "Slant", (err, data) => {
      console.log(gradient.pastel.multiline(data));
    });

    await sleep();

    let chooseTaskList = ["📑 View tasks", "📝 Add new task", "✅ Done tasks"];
    chooseTaskList.push(new inquirer.Separator());
    chooseTaskList.push(`${chalk.red("🛑 Exit")}`);

    const Responses = await inquirer.prompt({
      name: "Response",
      type: "list",
      message: "Choose options",
      choices: chooseTaskList,
      pageSize: chooseTaskList.length,
    });
    if (Responses.Response === "📑 View tasks") {
      console.clear();
      viewTask();
    } else if (Responses.Response === "📝 Add new task") {
      console.clear();
      addTask();
    } else if (Responses.Response === "✅ Done tasks") {
      console.clear();
      doneTask();
    } else {
      console.clear();
    }
  } else if (yargs.argv._[0] === "list") {
    console.clear();
    viewTask();
  } else if (yargs.argv._[0] === "add") {
    console.clear();
    addTask();
  } else if (yargs.argv._[0] === "done") {
    console.clear();
    doneTask();
  }
}

console.clear();
await todoCli();
