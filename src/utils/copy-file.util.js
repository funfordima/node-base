import path from 'node:path';
import { promises } from 'node:fs';

import { checkFileExists } from './check-file-exist.util.js';
import { validatePath } from './validate-path.util.js';

export const copyFile = async (filePath, dirPath) => {
  const sourcePath = path.resolve(validatePath([filePath])); 
  const destinationPath = path.resolve(validatePath([dirPath, path.parse(sourcePath).base]));  
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    console.log('\x1b[31m', 'Operation failed\r\n', '\x1b[0m');
  }

  try {
    await promises.cp(sourcePath, destinationPath);
  } catch (err) {
    console.log('\x1b[31m', 'Operation failed\r\n', '\x1b[0m');
  } 
};