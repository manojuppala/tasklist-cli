import * as chalk from "chalk";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { homedir } from "os";
import { default as list } from "./list.js";

const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";

let tasks = JSON.parse(fs.readFileSync(STORAGE_PATH, "utf-8"));

// function to list available projects.
export default async function listProj(config: configType) {
  const cancel = `${config?.emoji ?? true ? "❌ " : ""}cancel`;

  let projList = [];
  Object.keys(tasks).forEach((task: string) => {
    projList.push(task);
  });

  if (projList.length) {
    projList.push(new inquirer.Separator());
    projList.push(`${chalk.red(cancel)}`);

    const listProjs = await inquirer.prompt({
      name: "selectProj",
      type: "list",
      prefix: config?.emoji ?? true ? "📁" : undefined,
      message: "Choose a project to list tasks.",
      choices: projList,
      pageSize: projList.length,
    });

    if (listProjs.selectProj === `${chalk.red(cancel)}`) {
      console.clear();
      console.log(`No Project Choosen.`);
    } else {
      console.clear();
      await list(listProjs.selectProj);
    }
  } else {
    console.clear();
    console.log(`There are currently no projects.`);
  }
}
