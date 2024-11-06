const fs = require('fs');

const readJsonFile = (filepath) => {
const data = fs.readFileSync(filepath, 'utf8');
return JSON.parse(data);
};

const createDiff = (obj1, obj2) => {
const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
const diff = [];

allKeys.forEach(key => {
if (!obj1.hasOwnProperty(key)) {
diff.push(`+ ${key}: ${JSON.stringify(obj2[key])}`);
} else if (!obj2.hasOwnProperty(key)) {
diff.push(`- ${key}: ${JSON.stringify(obj1[key])}`);
} else if (obj1[key] !== obj2[key]) {
diff.push(`- ${key}: ${JSON.stringify(obj1[key])}`);
diff.push(`+ ${key}: ${JSON.stringify(obj2[key])}`);
}
});

return diff;
};

const formatDiff = (diff) => {
return '{\n' + diff.sort().join('\n') + '\n}';
};

const genDiff = (filepath1, filepath2) => {
const obj1 = readJsonFile(filepath1);
const obj2 = readJsonFile(filepath2);
const diff = createDiff(obj1, obj2);
return formatDiff(diff);
};

const output = genDiff('filepath1.json', 'filepath2.json');
console.log(output);

