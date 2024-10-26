import { Command } from 'commander';
import path from 'path';
import { parseJsonFile } from '../../fileParser.js';

const program = new Command();

program
.version('0.1.0')
.argument('', 'path to first json file')
.argument('', 'path to second json file')
.action((filepath1, filepath2) => {
const absolutePath1 = path.resolve(process.cwd(), filepath1);
const absolutePath2 = path.resolve(process.cwd(), filepath2);

try {
const data1 = parseJsonFile(absolutePath1);
const data2 = parseJsonFile(absolutePath2);
console.log('File 1 data:', data1);
console.log('File 2 data:', data2);
} catch (error) {
console.error('Error reading files:', error);
}
});

program.parse(process.argv);