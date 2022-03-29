import * as fs from "fs";
import { homedir } from "os";

// check if tasklist.json exists
export default async function fileCheck() {
  const STORAGE_PATH = homedir() + "/.tasklist/tasklist.json";
  const default_data = { default: [] };

  //create /.tasklist/tasklist.json if dosent exist already
  if (!fs.existsSync(STORAGE_PATH)) {
    if (!fs.existsSync(homedir() + "/.tasklist"))
      fs.mkdirSync(homedir() + "/.tasklist");
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
  }

  //if tasklist.json is empty
  if (fs.readFileSync(STORAGE_PATH).length === 0) {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(default_data));
  }
}
