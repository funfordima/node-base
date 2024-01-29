import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import path from 'node:path';
import { pipeline } from 'node:stream';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';


const calculateHash = async () => {
  const fileName = 'fileToCalculateHashFor.txt';
  const hash = createHash('sha256');
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }

  const sourceStream = createReadStream(sourcePath);
  
  pipeline(
    sourceStream,
    hash.setEncoding('hex'),
    stdout,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      }
    },
  );
};

await calculateHash();