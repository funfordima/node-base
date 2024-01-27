import { pipeline, Transform } from 'node:stream';
import { stdin, stdout } from 'node:process';

const transform = async () => {
	const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, `${String(chunk).split('').reverse().join('')}\n`);
    },
  });

	pipeline(
		stdin,
		reverseStream,
    stdout,
		(err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      }
    },
	);
};

await transform();