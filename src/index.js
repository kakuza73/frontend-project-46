import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildTreeDiff from './ast.js';
import chooseFormatter from './formatters/index.js';

const getFileFormat = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const format = path.extname(absolutePath).slice(1);
  const readfileData = fs.readFileSync(absolutePath, 'utf-8');
  return parse(format, readfileData);
};

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getFileFormat(filePath1);
  const data2 = getFileFormat(filePath2);
  const ast = buildTreeDiff(data1, data2);
  const formatAST = chooseFormatter(ast, formatName);
  return formatAST;
};

export default gendiff;
