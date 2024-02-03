import { getUserName } from './utils/get-user-name.util.js';
import { logDir } from './utils/log-dir.util.js';

const initApp = () => {
  const userName = getUserName();

  if (userName) {
    console.log('\x1b[33m%s\x1b[0m', `Welcome to the File Manager, ${userName}! \n`);
  }

  logDir();
};

initApp();
