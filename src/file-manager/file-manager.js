import path from 'node:path';

import { logDir } from '../utils/log-dir.util.js';

export class FileManager {
  constructor() {
    if (!FileManager.instance) {
      FileManager.instance = this;
    }

    return FileManager.instance;
  }

  up() {
    const currentDirectory = process.cwd();
    const rootDir = path.parse(currentDirectory).root;

    if (currentDirectory === rootDir) {
      logDir();
      return;
    }

    const newPath = path.join(currentDirectory, '..');
    process.chdir(newPath);
    logDir();
  }

  cd() {


  }

  ls() {


  }

  cat() {

  }

  add() {

  }

  rn() {

  }

  cp() {

  }

  mv() {

  }

  rm() {

  }

  os() {

  }

  hash() {

  }

  compress() {

  }

  decompress() {

  }
}
