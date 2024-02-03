import os from 'node:os';

export const logDir = () => {
  const currentDirectory = os.homedir();
 
  console.log('\x1b[2m', `You are currently in ${currentDirectory} \n`);
};
