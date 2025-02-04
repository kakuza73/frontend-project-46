import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(fixturePath(filename), 'utf-8');

const filePath1 = fixturePath('file1.json');
const filePath2 = fixturePath('file2.yaml');
const expectJson = readFile(fixturePath('expectJson.txt'));
const expectStylish = readFile(fixturePath('expectStylish.txt'));
const expectPlain = readFile(fixturePath('expectPlain.txt'));

test('unsupport format', () => {
  const data = 'data';
  const format = 'txt';
  expect(() => parse(format, data)).toThrow('Not support format: txt');
});

test('Stylish builder', () => {
  expect(gendiff(filePath1, filePath2)).toEqual(expectStylish);
});

test('Plain builder', () => {
  expect(gendiff(filePath1, filePath2, 'plain')).toEqual(expectPlain);
});

test('Json builder', () => {
  expect(gendiff(filePath1, filePath2, 'json')).toEqual(expectJson);
});
