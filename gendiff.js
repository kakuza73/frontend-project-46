#!/usr/bin/env node

const { Command } = require('commander');
const parseFile = require('./parser.js');
const buildAst = require('./buildAst');
const getFormatter = require('./formatters');
const program = new Command();

const genDiff = (filepath1, filepath2, formatName = 'default') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const ast = buildAst(file1, file2);
  const format = getFormatter(formatName);
  return format(ast);
};

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default, plain, json)', 'default')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse(process.argv);