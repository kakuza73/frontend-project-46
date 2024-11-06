const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(fileContent);
  } else if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(fileContent);
  } else {
    throw new Error(`Unsupported file extension: ${ext}`);
  }
};

module.exports = parseFile;
