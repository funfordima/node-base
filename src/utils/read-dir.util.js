import { promises } from 'node:fs';

import { checkFileExists } from './check-file-exist.util.js';

export const readDir = async () => {
  const sourcePath = process.cwd(); 
  const isSourceEntityExists = await checkFileExists(sourcePath);

  if (!isSourceEntityExists) {
    console.log('\x1b[31m', 'Operation failed\r\n', '\x1b[0m');
  }

  try {
    const files = await promises.readdir(sourcePath, { withFileTypes: true });
    const resultList = files.map((file) => {
      return {
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
      };
    });
    const dirList = resultList.filter(({ type }) => type === 'directory').sort();
    const fileList = resultList.filter(({ type }) => type === 'file').sort();

    console.table([...dirList, ...fileList]);
  } catch (error) {
    console.log('\x1b[31m', 'Operation failed\r\n', '\x1b[0m');
  }
};