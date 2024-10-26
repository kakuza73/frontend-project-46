const fs = require('fs');
const path = require('path');
const genDiff = (filepath1, filepath2) => {
const data1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
const data2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

return `Differences between ${filepath1} and ${filepath2}:\n${data1}\n${data2}`;
};

export default genDiff;