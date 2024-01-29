import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getPath = (metaUrl) => dirname(fileURLToPath(metaUrl));
