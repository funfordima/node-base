export const changeDir = (dirPath) => {
  try {
    process.chdir(dirPath);
  } catch (error) {
    console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
  }
};
