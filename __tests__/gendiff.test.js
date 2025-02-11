import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(fixturePath(filename), 'utf-8');

const expectJson = readFile(fixturePath('expectJson.txt'));
const expectStylish = readFile(fixturePath('expectStylish.txt'));
const expectPlain = readFile(fixturePath('expectPlain.txt'));

describe('gendiff', () => {
  test('unsupport format', () => {
    expect(() => parse('txt', 'data')).toThrow('Not support format: txt');
  });

  const formats = ['json', 'yml', 'yaml'];
  const outputs = [
    ['stylish', expectStylish],
    ['plain', expectPlain],
    ['json', expectJson],
  ];

  test.each(formats)('compare %s files', (format) => {
    const filePath1 = fixturePath(`file1.${format}`);
    const filePath2 = fixturePath(`file2.${format}`);

    outputs.forEach(([outputFormat, expected]) => {
      expect(gendiff(filePath1, filePath2, outputFormat)).toEqual(expected);
    });

    expect(gendiff(filePath1, filePath2)).toEqual(expectStylish);
  });
});
