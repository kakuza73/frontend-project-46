import yaml from 'js-yaml';

const parseFile = (fileContent, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Формат файла ${fileExt} не поддерживается`);
  }
};

export default parseFile;
