import path from 'node:path';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const compress = async () => {
  const fileName = 'fileToCompress.txt';
  const destinationName = 'archive.gz';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const destinationPath = path.resolve(getPath(import.meta.url), FILES, destinationName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }
  
  const gzip = createGzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  
  pipeline(
    source, 
    gzip, 
    destination, 
    (err) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }
  });
};

await compress();