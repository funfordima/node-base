import { createReadStream } from 'node:fs';

import { validatePath } from './validate-path.util.js';  
import { checkFileExists } from './check-file-exist.util.js';

export const readFile = async (pathToFile) => {
	const sourcePath = validatePath(pathToFile);
  const isSourceFileExists = await checkFileExists(sourcePath);

  if (!isSourceFileExists) {
    console.log('Operation failed');
    return;
  }

  await new Promise((res, rej) => {
    const sourceStream = createReadStream(sourcePath, { encoding: 'utf8' });

    console.log('\x1b[36m%s\x1b[0m', 'File content:');

    sourceStream.on('data', (chunk) => {
      console.log(chunk);
    });

    sourceStream.on('end', () => {
      process.stdout.setEncoding('utf8');
      res();
    });

    sourceStream.on('error', () => {
      rej('Operation failed\r\n');
    });
  });
};