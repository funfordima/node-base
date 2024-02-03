export const getUserName = () => {
  const entryString = '--username';
  const argList = process.argv.slice(2);
  const userName = argList.find((arg) => arg.startsWith(entryString))?.split('=')?.[1];

  if (!userName) {
    process.stdout.write('Invalid input. \n');
  }

  return userName;
};
