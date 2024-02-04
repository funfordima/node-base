import path from 'node:path';
import { promises } from 'node:fs';

export const addFile = async (fileName) => {
	const sourcePath = path.resolve(process.cwd(), fileName);

	try {
		await promises.writeFile(sourcePath, '', { flag: 'w+' });
	} catch (error) {
		console.log('\x1b[31m', 'Operation failed', '\x1b[0m');
	}
};