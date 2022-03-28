#!/usr/bin/env node

import * as yargs from "yargs";
import {
  add,
  addTo,
  list,
  listDate,
  done,
  listAll,
  addProj,
  listProj,
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
    (yargs.argv as any)._[0] === "lsp"
  ) {
    console.clear();
    listProj();
  } else {
    yargs.showHelp();
  }
}

(async () => {
  console.clear();
  await taskList();
})();
