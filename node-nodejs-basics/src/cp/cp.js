import path from 'node:path';
import { fork } from 'node:child_process';

import { FILES } from '../constants/path-file.constant.js';
import { getPath } from '../utils/index.js';

const spawnChildProcess = async (args) => {
	const fileName = 'script.js';
	const sourcePath = path.resolve(getPath(import.meta.url), FILES, fileName);

	fork(sourcePath, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
