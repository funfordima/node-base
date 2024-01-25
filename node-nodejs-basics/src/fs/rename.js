import path from 'path';
import { promises } from 'fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const rename = async () => {
  const fileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName);
  const destinationPath = path.resolve(getPath(import.meta.url), FILES, newFileName);

  const isSourceFileExists = await checkFileExists(sourcePath);
  const isDEstinationFileExists = await checkFileExists(destinationPath);

  if (!isSourceFileExists || isDEstinationFileExists) {
    throw new CustomValidationError();
  }

  try {
    await promises.rename(sourcePath, destinationPath);
  } catch (error) {
    process.stderr.write(error);
  }
};

await rename();