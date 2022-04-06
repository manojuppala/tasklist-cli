#!/usr/bin/env node

import * as yargs from "yargs";
import * as fs from "fs";
import { homedir } from "os";
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
  // check for config.json
  const CONFIG = homedir() + "/.tasklist/config.json";
  let config;
  if (fs.existsSync(CONFIG)) {
    config = JSON.parse(fs.readFileSync(CONFIG, "utf-8"));
  }

  // task --help
  help();

  if (
    (yargs.argv as any)._[0] === "list" ||
    (yargs.argv as any)._[0] === "ls"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? list(config, (yargs.argv as any)._[1])
      : list(config);
  } else if (
    (yargs.argv as any)._[0] === "listall" ||
    (yargs.argv as any)._[0] === "la"
  ) {
    console.clear();
    listAll(config);
  } else if (
    (yargs.argv as any)._[0] === "listdate" ||
    (yargs.argv as any)._[0] === "ld"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? listDate(config, (yargs.argv as any)._[1])
      : listDate(config);
  } else if (
    (yargs.argv as any)._[0] === "add" ||
    (yargs.argv as any)._[0] === "a"
  ) {
    console.clear();
    add(config);
  } else if (
    (yargs.argv as any)._[0] === "addto" ||
    (yargs.argv as any)._[0] === "at"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? addTo(config, (yargs.argv as any)._[1])
      : yargs.showHelp();
  } else if (
    (yargs.argv as any)._[0] === "done" ||
    (yargs.argv as any)._[0] === "d"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? done(config, (yargs.argv as any)._[1])
      : done(config);
  } else if (
    (yargs.argv as any)._[0] === "addproj" ||
    (yargs.argv as any)._[0] === "ap"
  ) {
    console.clear();
    addProj(config);
  } else if (
    (yargs.argv as any)._[0] === "listproj" ||
    (yargs.argv as any)._[0] === "lp"
  ) {
    console.clear();
    listProj(config);
  } else if (
    (yargs.argv as any)._[0] === "remove" ||
    (yargs.argv as any)._[0] === "rm"
  ) {
    console.clear();
    (yargs.argv as any)._[1]
      ? removeProj(config, (yargs.argv as any)._[1])
      : yargs.showHelp();
  } else {
    yargs.showHelp();
  }
}

(async () => {
  console.clear();
  await taskList();
})();
