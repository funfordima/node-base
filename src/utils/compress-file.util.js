import path from 'node:path';
import { createGzip } from 'node:zlib';
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import { checkFileExists } from './check-file-exist.util.js';
import { validatePath } from './validate-path.util.js';

export const compressFile = async (filePath, destPath) => {
  const sourcePath = path.resolve(validatePath([filePath]));
  const destinationPath = path.resolve(validatePath([destPath]));
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
    return;
  }

  await new Promise((res, rej) => {
    const gzip = createGzip();
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    const compressStream = sourceStream.pipe(gzip).pipe(destinationStream);

    console.log('\x1b[36m%s\x1b[0m', 'Compressed file has been created.');

    compressStream.on('data', (chunk) => {
      console.log(chunk);
    });

    compressStream.on('end', () => {
      process.stdout.setEncoding('utf8');
      res();
    });

    compressStream.on('error', () => {
      rej('Operation failed\r\n');
    });
  });
};