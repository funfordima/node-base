import readline from 'node:readline';
import os from 'node:os';

import { getUserName } from './utils/get-user-name.util.js';
import { validateInput } from './utils/validate-input.util.js';
import { FileManager } from './file-manager/file-manager.js';
import { changeDir } from './utils/change-dir.util.js';

const initApp = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '-->',
  }); 
  const userName = getUserName();

  changeDir(os.homedir());

  rl.question(`\x1b[33m%s\x1b[0m Welcome to the File Manager, ${userName}! \n \x1b[2m You are currently in ${process.cwd()} \n\x1b[0m`, (input) => {
    if (input === '.exit') {
      rl.close();
      return;
    }

    const { method, params } = validateInput(input);

    new FileManager()[method](...params);
  });

  rl.on('line', (input) => {
    if (input === '.exit') {
      rl.close();
      return;
    }

    const { method, params } = validateInput(input);

    new FileManager()[method](...params);
  }); 

  rl.on('SIGINT', () => rl.close());

  rl.on('close', () => {
    console.log('\x1b[32m', `Thank you for using File Manager, ${userName}, goodbye!`, '\x1b[0m');
    process.exit(0);
  });
};

initApp();
