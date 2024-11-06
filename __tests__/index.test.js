import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import { extractFileExt, extractFileContent } from '../src/extract.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedResultFlat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedResultStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedResultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expectedResultJson = '{"follow":{"type":"deleted","value":false},"host":{"type":"unchanged","value":"hexlet.io"},'
+ '"proxy":{"type":"deleted","value":"123.234.53.22"},"timeout":{"type":"changed","oldValue":50,"newValue":20},'
+ '"verbose":{"type":"added","value":true}}';

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test('genDiff flat test', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultFlat);
});

test('genDiff yml test', () => {
  const path1 = getFixturePath('filepath1.yml');
  const path2 = getFixturePath('filepath2.yaml');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultFlat);
});

test('genDiff stylish test', () => {
  const path1 = getFixturePath('filepath1.json');
  const path2 = getFixturePath('filepath2.json');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultStylish);
});

test('genDiff plain test', () => {
  const path1 = getFixturePath('filepath1.json');
  const path2 = getFixturePath('filepath2.json');
  const gendiffResult = genDiff(path1, path2, 'plain');
  expect(gendiffResult).toEqual(expectedResultPlain);
});

test('genDiff json test', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const gendiffResult = genDiff(path1, path2, 'json');
  expect(gendiffResult).toEqual(expectedResultJson);
});

test('throws an error for unsupported file format', () => {
  const filePath = getFixturePath('testfile.txt'); // Пример файла с неподдерживаемым расширением
  const fileExt = extractFileExt(filePath);
  const fileContent = extractFileContent(filePath, 'utf8');
  expect(() => {
    parseFile(fileContent, fileExt);
  }).toThrow(`Формат файла ${path.extname(filePath)} не поддерживается`);
});

test('throws an error for wrong formatter type', () => {
  const formatName = 'wrong';
  const path1 = getFixturePath('filepath1.json');
  const path2 = getFixturePath('filepath2.json');
  expect(() => {
    genDiff(path1, path2, formatName); // Убираем gendiffResult
  }).toThrow(`Unknown format name: ${formatName}`);
});
