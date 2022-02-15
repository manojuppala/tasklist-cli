#!/usr/bin/env node

import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as yargs from "yargs";
import { addTask, viewTask, viewTaskDate, doneTask } from "./actions/index.js";

// function to initialize tasklist-cli
async function taskList() {
  yargs
    .usage("Usage: task [command]")
    .command(
      "list",
      "- lists all the tasks that are marked undone.",
      (yargs) => {
        yargs.usage(`Usage: task list (or) task ls`);
      }
    )
    .command(
      "listdate",
      "- lists all the tasks that are marked undone with due dates.",
      (yargs) => {
        yargs.usage(`Usage: task listdate (or) task ld`);
      }
    )
    .command("add", "- adds a new task to the task list.", (yargs) => {
      yargs.usage(`Usage: task add (or) task a`);
    })
    .command("done", "- lists all the tasks that are marked.", (yargs) => {
      yargs.usage(`Usage: task done (or) task d`);
    })
    .alias("h", "help")
    .help("help")
    .alias("v", "version").argv;

  if ((yargs.argv as any)._[0]) {
    if (
      (yargs.argv as any)._[0] === "list" ||
      (yargs.argv as any)._[0] === "ls"
    ) {
      console.clear();
      viewTask();
    } else if (
      (yargs.argv as any)._[0] === "listdate" ||
      (yargs.argv as any)._[0] === "ld"
    ) {
      console.clear();
      viewTaskDate();
    } else if (
      (yargs.argv as any)._[0] === "add" ||
      (yargs.argv as any)._[0] === "a"
    ) {
      console.clear();
      addTask();
    } else if (
      (yargs.argv as any)._[0] === "done" ||
      (yargs.argv as any)._[0] === "d"
    ) {
      console.clear();
      doneTask();
    } else {
      yargs.showHelp();
    }
  } else {
    let chooseTaskList = ["📑 View tasks", "📝 Add new task", "✅ Done tasks"];
    chooseTaskList.push(new inquirer.Separator() as any);
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

(async () => {
  console.clear();
  await taskList();
})();
