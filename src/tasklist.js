#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import yargs from "yargs";
import { addTask, viewTask, viewTaskDate, doneTask } from "./actions/index.js";

// function to initialize tasklist-cli
async function taskList() {
  if (yargs.argv._[0] === "list" || yargs.argv._[0] === "ls") {
    console.clear();
    viewTask();
  } else if (yargs.argv._[0] === "listdate" || yargs.argv._[0] === "ld") {
    console.clear();
    viewTaskDate();
  } else if (yargs.argv._[0] === "add" || yargs.argv._[0] === "a") {
    console.clear();
    addTask();
  } else if (yargs.argv._[0] === "done" || yargs.argv._[0] === "d") {
    console.clear();
    doneTask();
  } else {
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
    console.clear();
    if (Responses.Response === "📑 View tasks") {
      viewTask();
    } else if (Responses.Response === "📝 Add new task") {
      addTask();
    } else if (Responses.Response === "✅ Done tasks") {
      doneTask();
    } else {
      console.clear();
    }
  }
}

console.clear();
await taskList();
