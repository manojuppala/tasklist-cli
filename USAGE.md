# [tasklist-cli](https://github.com/manojuppala/tasklist-cli) Usage

you can perform any of the actions listed below.

```shell
task [action] [project_name]
```

## Actions

### `add`

- Adds a new task to default list (or project).

```shell
task add
task a
```

### `addproj`

- Creates a new project with the name specified.

```shell
task addproj
task ap
```

### `addto`

- Adds a new task to specified project.

```shell
task addto [project_name]
task at [project_name]
```

### `done`

- Lists all the tasks that are marked done.

```shell
task done [project_name]
task d [project_name]
```

_Note: [project_name] is optional._

### `list`

- Lists tasks that are marked undone from specified project.

```shell
task list [project_name]
task l [project_name]
```

_Note: [project_name] is optional._

### `listall`

- Lists tasks that are marked undone from all projects.

```shell
task listall
task la
```

### `listdate`

- Lists tasks marked undone along with due date.

```shell
task listdate [project_name]
task ld [project_name]
```

_Note: [project_name] is optional._

### `listproj`

- Lists all available projects.

```shell
task listproj
task lp
```

### `remove`

- Deletes a project permanently.

```shell
task remove [project_name]
task rm [project_name]
```

### `--help`

- Show help.

```shell
task [action] --help
task [action] -h
```

### `--version`

- Show version number.

```shell
task --version
task -v
```
