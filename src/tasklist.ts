#!/usr/bin/env node

import * as yargs from "yargs";
import {
  add,
  addProj,
  addTo,
  done,
  help,
  list,
  listAll,
  listDate,
  listProj,
  removeProj,
} from "./actions/index.js";

// function to initialize tasklist-cli
async function taskList() {
  help();

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
