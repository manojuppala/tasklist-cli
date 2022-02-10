# [tasklist-cli](https://github.com/manojuppala/tasklist-cli) Usage

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
