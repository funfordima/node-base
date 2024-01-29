import path from 'path';
import { promises } from 'fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const remove = async () => {
  const fileName = 'fileToRemove.txt';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }

  try {
    await promises.rm(sourcePath);
  } catch (error) {
    process.stderr.write(error);
  }
};

await remove();