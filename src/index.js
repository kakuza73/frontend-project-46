import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildTreeDiff from './ast.js';
import chooseFormatter from './formatters/index.js';

const getReadFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const format = path.extname(absolutePath).slice(1);
  const readfileData = fs.readFileSync(absolutePath, 'utf-8');
  return parse(format, readfileData);
};

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = getReadFile(filePath1);
  const file2 = getReadFile(filePath2);
  const ast = buildTreeDiff(file1, file2);
  const formatAST = chooseFormatter(ast, formatName);
  return formatAST;
};

export default gendiff;
