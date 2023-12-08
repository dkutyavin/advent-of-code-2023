import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { forEachLine } from '../shared/forEachLine.mjs';

/**
 *
 * @param {String} string
 */
function getCalibrationValue(string) {
  const values = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const digits = [];

  for (let i = 0; i < string.length; i++) {
    if (string[i].match(/\d/)) {
      digits.push(string[i]);
      continue;
    }

    for (const value of values) {
      if (string.slice(i).startsWith(value)) {
        digits.push(values.indexOf(value) + 1);
      }
    }
  }

  return Number(digits[0] + digits.at(-1).toString());
}

async function processLineByLine() {
  let result = 0;

  await forEachLine(createReadStream(new URL('./data.txt', import.meta.url)), (line) => {
    result += getCalibrationValue(line);
  });

  return result;
}

processLineByLine().then((sum) => {
  console.log(sum);
});
