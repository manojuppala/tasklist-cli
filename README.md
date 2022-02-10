# Tasklist-cli

![CI](https://github.com/todotxt/todo.txt-cli/workflows/CI/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues/todotxt/todo.txt-cli.svg)](https://github.com/todotxt/todo.txt-cli/issues)
[![GitHub forks](https://img.shields.io/github/forks/todotxt/todo.txt-cli.svg)](https://github.com/todotxt/todo.txt-cli/network)
[![GitHub stars](https://img.shields.io/github/stars/todotxt/todo.txt-cli.svg)](https://github.com/todotxt/todo.txt-cli/stargazers)
[![GitHub license](https://img.shields.io/github/license/todotxt/todo.txt-cli.svg)](https://raw.githubusercontent.com/todotxt/todo.txt-cli/master/LICENSE)

<p>
  <img src="assets/tasklist-cli.png" alt="camKapture" width="150"/>
</p>

Tasklist-cli is a simple and elegant command line application to manage tasks and todos. Tasklist-cli exists to bring all the needed functionalities for simple project management to the terminal. No graphical interface is needed; this tool is easy enough to use to improve your workflow.

## Features

- add todo tasks.
- mark tasks as done.
- revoke done tasks.
- delete all done tasks.

## Installation

using Node package manager

```shell
npm i tasklist-cli
```

you should now be able to use the command `task`

## Usage

you can either use just the task command or task command with a action.

```shell
task
```

```shell
task [action]
```

## Actions

### `add`

- returns a input prompt which takes the input of new task name.

```shell
task add
task a
```

### `list`

- returns the list of all tasks that are incomplete.
- you can either select a task to mark as done or cancel.

```shell
task list
task l
```

### `done`

- returns the list of all tasks that are marked done.
- you can select a task to revoke and mark as undone.
  or
- you can choose to clear all completed tasks(they will be gone forever).

```shell
task done
task d
```

Read about all the possible commands in [USAGE](https://github.com/manojuppala/tasklist-cli/blob/main/USAGE.md) file.

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk)
- [figlet](https://www.npmjs.com/package/figlet)
- [gradient-string](https://www.npmjs.com/package/gradient-string)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [nanospinner](https://www.npmjs.com/package/nanospinner)
- [yargs](https://www.npmjs.com/package/yargs)

## License

```
The files and scripts in this repository are licensed under the MIT License, which is a very permissive license allowing you to use, modify, copy, distribute, sell, give away, etc. the software. In other words, do what you want with it. The only requirement with the MIT License is that the license and copyright notice must be provided with the software.
```

<a href='https://github.com/manojuppala/todo-list-cli/blob/main/LICENSE'>
<img src="assets/mit-license.png" alt="camKapture" width="150"/>
</a>
