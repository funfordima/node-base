import path from 'path';
import { promises } from 'fs';

import { checkFileExists, getPath } from '../utils/index.js';
import { FILES } from '../constants/path-file.constant.js';
import { CustomValidationError } from '../errors/custom-validation.error.js';

const create = async () => {
	const fileName = 'fresh.txt';
	const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName);
	const isFileExists = await checkFileExists(sourcePath);

	if (isFileExists) {
		throw new CustomValidationError();
	}

	try {
		await promises.writeFile(sourcePath, 'I am fresh and young \n', 'utf-8');
	} catch (error) {
		process.stderr.write(error);
	}
};

await create();