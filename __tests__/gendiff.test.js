/*const genDiff = require('../gendiff');

test('genDiff compares two JSON files', () => {
    const file1 = 'test_files/file1.json';
    const file2 = 'test_files/file2.json';
    const expected = `{
        follow: false host: hexlet.io
        proxy: 123.234.53.22
        timeout: 50
        timeout: 20
        verbose: true }`; 
    expect(genDiff(file1, file2)).toBe(expected);
});*/

/*const genDiff = require('../gendiff');

test('genDiff compares two YAML files', () => {
    const file1 = 'test_files/file1.yml';
    const file2 = 'test_files/file2.yml';
    const expected = `{
        follow: false host: hexlet.io
        proxy: 123.234.53.22
        timeout: 50
        timeout: 20
        verbose: true }`;
    expect(genDiff(file1, file2)).toBe(expected);
});*/

const genDiff = require('../gendiff');

test('genDiff compares two JSON files with plain format', () => {
    const file1 = 'test_files/file1.json';
    const file2 = 'test_files/file2.json';
    const expected = `Property 'common.follow' was added with value: false
        Property 'common.setting2' was removed
        Property 'common.setting3' was updated. From true to null
        Property 'common.setting4' was added with value: 'blah blah'
        Property 'group1.baz' was updated. From 'bas' to 'bars'
        Property 'group2' was removed
        Property 'group3' was added with value: [complex value]`;
    expect(genDiff(file1, file2, 'plain')).toBe(expected);
});

