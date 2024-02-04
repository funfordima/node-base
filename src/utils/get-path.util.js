import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getPath = (metaUrl) => dirname(fileURLToPath(metaUrl));
