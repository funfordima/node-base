import path from 'node:path';
import { promises } from 'node:fs';

import { validatePath } from './validate-path.util.js';

export const deleteFile = async (filePath) => {
  const sourcePath = path.resolve(validatePath([filePath]));

  try {
    await promises.rm(sourcePath);
  } catch (error) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
  }
};