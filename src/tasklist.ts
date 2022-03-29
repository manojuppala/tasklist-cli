#!/usr/bin/env node

import * as yargs from "yargs";
import {
  add,
  addProj,
  addTo,
  done,
  list,
  listAll,
  listDate,
  listProj,
  removeProj,
} from "./actions/index.js";

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
    .command("listall", "- lists all the tasks from all projects.", (yargs) => {
      yargs.usage(`Usage: task listall (or) task la`);
    })
    .command("addto", "- adds a new task to a specific project.", (yargs) => {
      yargs.usage(
        `Usage: task addto [project_name] (or) task at [project_name]`
      );
    })
    .command(
      "addproj",
      "- creates a new empty project with the name specified.",
      (yargs) => {
        yargs.usage(
          `Usage: task addproj [new_project_name] (or) task ap [new_project_name]`
        );
      }
    )
    .command("listproj", "- lists all the available projects.", (yargs) => {
      yargs.usage(`Usage: task listproj (or) task lp`);
    })
    .command("remove", "- removes the specified project.", (yargs) => {
      yargs.usage(
        `Usage: task remove [project_name] (or) task rm [project_name]`
      );
    })
    .alias("h", "help")
    .help("help")
    .alias("v", "version").argv;

  if (
    (yargs.argv as any)._[0] === "list" ||
    (yargs.argv as any)._[0] === "ls"
  ) {
    console.clear();
    (yargs.argv as any)._[1] ? list((yargs.argv as any)._[1]) : list();
  } else if (
    (yargs.argv as any)._[0] === "listall" ||
    (yargs.argv as any)._[0] === "la"
  ) {
    console.clear();
    listAll();
  } else if (
    (yargs.argv as any)._[0] === "listdate" ||
    (yargs.argv as any)._[0] === "ld"
  ) {
    console.clear();
    (yargs.argv as any)._[1] ? listDate((yargs.argv as any)._[1]) : listDate();
  } else if (
    (yargs.argv as any)._[0] === "add" ||
    (yargs.argv as any)._[0] === "a"
  ) {
    console.clear();
    add();
  } else if (
    (yargs.argv as any)._[0] === "addto" ||
    (yargs.argv as any)._[0] === "at"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? addTo((yargs.argv as any)._[1])
      : yargs.showHelp();
  } else if (
    (yargs.argv as any)._[0] === "done" ||
    (yargs.argv as any)._[0] === "d"
  ) {
    console.clear();
    (yargs.argv as any)._[1] ? done((yargs.argv as any)._[1]) : done();
  } else if (
    (yargs.argv as any)._[0] === "addproj" ||
    (yargs.argv as any)._[0] === "ap"
  ) {
    console.clear();
    addProj();
  } else if (
    (yargs.argv as any)._[0] === "listproj" ||
    (yargs.argv as any)._[0] === "lp"
  ) {
    console.clear();
    listProj();
  } else if (
    (yargs.argv as any)._[0] === "remove" ||
    (yargs.argv as any)._[0] === "rm"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? removeProj((yargs.argv as any)._[1])
      : yargs.showHelp();
  } else {
    yargs.showHelp();
  }
}

(async () => {
  console.clear();
  await taskList();
})();
