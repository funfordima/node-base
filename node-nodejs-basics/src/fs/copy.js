import path from 'path';
import { promises } from 'fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const copy = async () => {
  const COPY_PATH = 'files_copy';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES); 
  const destinationPath = path.resolve(getPath(import.meta.url), COPY_PATH); 

  try {
    const hasSourceEntity = await checkFileExists(sourcePath);
    const hasDestinationEntity = await checkFileExists(destinationPath);

    if (!hasSourceEntity || hasDestinationEntity) {
      throw new CustomValidationError();
    }

    await promises.cp(sourcePath, destinationPath, { recursive: true });
  } catch (err) {
    process.stderr.write(err);
  } 
};

await copy();
