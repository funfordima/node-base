export const getUserName = () => {
  const entryString = '--username';
  const argList = process.argv.slice(2);
  const userName = argList.find((arg) => arg.startsWith(entryString))?.split('=')?.[1];

  if (!userName) {
    console.log('\x1b[31m', 'Invalid input. \n\x1b[0m');
    return;
  }

  return userName;
};
