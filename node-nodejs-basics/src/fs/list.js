import path from 'path';
import { promises } from 'fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const list = async () => {
  const sourcePath = path.resolve(getPath(import.meta.url), FILES); 
  const isSourceEntityExists = await checkFileExists(sourcePath);

  if (!isSourceEntityExists) {
    throw new CustomValidationError();
  }

  try {
    const files = await promises.readdir(sourcePath);

    process.stdout.write('[ \n');

    for (const file of files) {
      process.stdout.write(`  ${file}, \n`);
    }
    
    process.stdout.write(']');
  } catch (error) {
    process.stderr.write(error);
  }
};

await list();