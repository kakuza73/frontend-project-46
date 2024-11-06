## Badges
#### Hexlet tests and linter status:
[![Actions Status](https://github.com/kakuza73/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kakuza73/frontend-project-46/actions)


# Diff Tool Project

### Hexlet tests and linter status:
[![Actions Status](https://github.com/kakuza73/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kakuza73/frontend-project-46/actions)

## About project
__Diff Tool__ - is a program that compares two files, identifies the differences between them, and displays them to the user. It supports the following file formats: JSON, YAML, and YAML.

## How to install
Before you start, make sure that:
1. You are using a development-friendly operating system (e.g. Ubuntu, macOS). For Windows owners, I recommend that you set up a Windows Subsystem for Linux (WSL).
2. You know how to start a terminal and can execute commands in it.

If you understand what is written above, you need to execute the following commands:
```sh
$ git clone git@github.com:kakuza73/frontend-project-46.git
$ cd frontend-project-46/
$ make install
$ npm link
```
## Usage
```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (choices: "stylish", "plain", "json")
  -h, --help           display help for command
```
## Examples
### Comparison of flat JSON files
The diff is based on how the files have changed relative to each other, the keys are displayed in alphabetical order.
```sh
gendiff file1.json file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
The absence of a plus or minus indicates that the key is in both files and its values are the same. In all other situations, the value of the key is either different, or the key is in only one file. In the example above, the timeout key is in both files but has different values, proxy is only in file1 and verbose is only in file2.