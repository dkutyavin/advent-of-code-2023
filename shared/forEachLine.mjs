import { createInterface } from 'readline';

export async function forEachLine(fileStream, cb) {
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    cb(line);
  }
}
