import path from 'node:path';
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const decompress = async () => {
  const fileName = 'archive.gz';
  const destinationName = 'fileToCompress.txt';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const destinationPath = path.resolve(getPath(import.meta.url), FILES, destinationName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }
  
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  const decompress = createUnzip();
  
  pipeline(
    source, 
    decompress, 
    destination, 
    (err) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }
  });
};

await decompress();