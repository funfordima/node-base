import path from 'node:path';
import { pipeline } from 'node:stream';
import { stdin } from 'node:process';
import { createWriteStream } from 'node:fs';

import { FILES } from '../constants/path-file.constant.js';
import { getPath, checkFileExists } from '../utils/index.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const write = async () => {
	const fileName = 'fileToWrite.txt';
  const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName); 
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    throw new CustomValidationError();
  }

	const sourceStream = createWriteStream(sourcePath);

	pipeline(
		stdin,
		sourceStream,
		(err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      }
    },
	);
};

await write();