import readline from 'node:readline';
import os from 'node:os';

import { getUserName } from './utils/get-user-name.util.js';
import { logDir } from './utils/log-dir.util.js';
import { CustomValidationError } from './errors/custom-validation-error.js';
import { validateInput } from './utils/validate-input.util.js';
import { FileManager } from './file-manager/file-manager.js';

const initApp = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '-->',
  }); 
  const userName = getUserName();

  try {
    process.chdir(os.homedir());
  } catch (error) {
    new CustomValidationError();
  }

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
    
    logDir();

    new FileManager()[method](...params);
  }); 

  rl.on('SIGINT', () => rl.close());

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  });
};

initApp();
