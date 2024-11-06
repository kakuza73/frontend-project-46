import path from 'path';
import fs from 'fs';

const extractFileExt = (filePath) => path.extname(filePath);

const extractFileContent = (filePath, txtFormat = 'utf8') => fs.readFileSync(filePath, txtFormat);

export { extractFileContent, extractFileExt };
