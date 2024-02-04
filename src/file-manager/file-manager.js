import path from 'node:path';

import { logDir } from '../utils/log-dir.util.js';
import { validatePath } from '../utils/validate-path.util.js';
import { changeDir } from '../utils/change-dir.util.js';
import { readDir } from '../utils/read-dir.util.js';
import { readFile } from '../utils/read-file.util.js';
import { addFile } from '../utils/add-file.util.js';
import { renameFile } from '../utils/rename-file.util.js';
import { copyFile } from '../utils/copy-file.util.js';
import { deleteFile } from '../utils/delete-file.util.js';
import { osOperations } from '../utils/os-operations.util.js';
import { hashFile } from '../utils/hash-file.util.js';

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

    changeDir(newPath);
    logDir();
  }

  cd(...args) {
    const targetPath = validatePath(args);
    const currentDirectory = process.cwd();
    const rootDir = path.parse(currentDirectory).root;
    const targetRootDir = path.parse(targetPath).root;

    if (targetRootDir !== rootDir) {
      logDir();
      return;
    }

    changeDir(targetPath);
    logDir();
  }

  async ls() {
    await readDir();
    logDir();
  }

  async cat(...pathToFile) {
    await readFile(pathToFile);
    logDir();
  }

  async add(fileName) {
    await addFile(fileName);
    logDir();
  }

  async rn(filePath, fileName) {
    await renameFile(filePath, fileName);
    logDir();
  }

  async cp(filePath, dirPath) {
    await copyFile(filePath, dirPath);
    logDir();
  }

  async mv(filePath, dirPath) {
    await copyFile(filePath, dirPath);
    await deleteFile(filePath);
    logDir();
  }

  async rm(filePath) {
    await deleteFile(filePath);
    logDir();
  }

  os(operation) {
    osOperations(operation);
    logDir();
  }

  async hash(filePath) {
    await hashFile(filePath);
    logDir();
  }

  compress() {

  }

  decompress() {

  }
}
