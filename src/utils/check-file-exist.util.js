import { constants, promises } from 'node:fs';

export const checkFileExists = async (filePath) => {
  return await promises.access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
