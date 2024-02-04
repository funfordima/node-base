import path from 'node:path';
import { promises } from 'node:fs';

import { checkFileExists } from './check-file-exist.util.js';
import { validatePath } from './validate-path.util.js';

export const renameFile = async (filePath, fileName) => {
  const sourcePath = path.resolve(validatePath([filePath]));
  const destinationPath = path.resolve(process.cwd(), fileName);
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
    return;
  }

  try {
    await promises.rename(sourcePath, destinationPath);
  } catch (error) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
  }
};