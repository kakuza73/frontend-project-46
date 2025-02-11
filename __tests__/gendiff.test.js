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

  const formats = [
    { file1: 'json', file2: 'json' },
    { file1: 'yml', file2: 'yaml' },
  ];
  const outputs = [
    ['stylish', expectStylish],
    ['plain', expectPlain],
    ['json', expectJson],
  ];

  test.each(formats)('compare %s and %s files', ({ file1, file2 }) => {
    const filePath1 = fixturePath(`file1.${file1}`);
    const filePath2 = fixturePath(`file2.${file2}`);

    outputs.forEach(([outputFormat, expected]) => {
      expect(gendiff(filePath1, filePath2, outputFormat)).toEqual(expected);
    });

    expect(gendiff(filePath1, filePath2)).toEqual(expectStylish);
  });
});
