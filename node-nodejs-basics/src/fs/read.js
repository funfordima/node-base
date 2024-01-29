import path from 'path';
import { promises } from 'fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const read = async () => {
  const fileName = 'fileToRead.txt';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }

  try {
    const content = await promises.readFile(sourcePath);

    process.stdout.write(content);
  } catch (error) {
    process.stderr.write(error);
  }
};

await read();