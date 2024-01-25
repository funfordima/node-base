import { constants, promises } from 'fs';

export const checkFileExists = async (filePath) => {
  return await promises.access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
