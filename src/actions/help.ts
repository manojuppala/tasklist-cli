import * as yargs from "yargs";

// function to return help documentation.
export default async function help() {
  return yargs
    .usage("Usage: task [command] [project_name]")
    .command(
      "add",
      "- Adds a new task to default list (or project).",
      (yargs) => {
        yargs.usage(`Usage: task add (or) task a`);
      }
    )
    .command(
      "addproj",
      "- Creates a new project with the name specified.",
      (yargs) => {
        yargs.usage(
          `Usage: task addproj [new_project_name] (or) task ap [new_project_name]`
        );
      }
    )
    .command("addto", "- Adds a new task to specified project.", (yargs) => {
      yargs.usage(
        `Usage: task addto [project_name] (or) task at [project_name]`
      );
    })
    .command("done", "- Lists all the tasks that are marked done.", (yargs) => {
      yargs.usage(`Usage: task done (or) task d`);
    })
    .command(
      "list",
      "- Lists tasks that are marked undone from specified project.",
      (yargs) => {
        yargs.usage(
          `Usage: task list [project_name] (or) task ls [project_name]`
        );
      }
    )
    .command(
      "listall",
      "- Lists tasks that are marked undone from all projects.",
      (yargs) => {
        yargs.usage(`Usage: task listall (or) task la`);
      }
    )
    .command(
      "listdate",
      "- Lists tasks marked undone along with due date.",
      (yargs) => {
        yargs.usage(
          `Usage: task listdate [project_name] (or) task ld [project_name]`
        );
      }
    )
    .command("listproj", "- Lists all available projects.", (yargs) => {
      yargs.usage(`Usage: task listproj (or) task lp`);
    })
    .command("remove", "- Deletes a project permanently.", (yargs) => {
      yargs.usage(
        `Usage: task remove [project_name] (or) task rm [project_name]`
      );
    })
    .alias("h", "help")
    .help("help")
    .alias("v", "version").argv;
}
