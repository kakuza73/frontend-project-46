#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.1')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((path1, path2, opts) => {
    console.log(genDiff(path1, path2, opts.format));
  });

program.parse(process.argv);
