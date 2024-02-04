import path from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

import { checkFileExists } from './check-file-exist.util.js';
import { validatePath } from './validate-path.util.js';

export const hashFile = async (filePath) => {
  const sourcePath = path.resolve(validatePath([filePath]));
  const hash = createHash('sha256').setEncoding('hex');
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
    return;
  }

  await new Promise((res, rej) => {
    const sourceStream = createReadStream(sourcePath, { encoding: 'utf8' });
    const hashStream = sourceStream.pipe(hash);

    console.log('\x1b[36m%s\x1b[0m', 'Hash stream:');

    hashStream.on('data', (chunk) => {
      console.log(chunk);
    });

    hashStream.on('end', () => {
      process.stdout.setEncoding('utf8');
      res();
    });

    hashStream.on('error', () => {
      rej('Operation failed\r\n');
    });
  });
};