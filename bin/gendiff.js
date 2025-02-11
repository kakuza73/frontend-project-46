#!/usr/bin/env node
/* eslint-disable max-len */

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => {
    const formatter = program.opts().format;
    const diff = gendiff(filePath1, filePath2, formatter);
    console.log(diff);
  });
program.parse();
