import { createReadStream } from 'fs';

import { forEachLine } from '../shared/forEachLine.mjs';

import { getSubsets } from './shared.mjs';

/**
 * @param {[number, number, number]} set
 */
function getPowerToTheSet([reds, greens, blues]) {
  return reds * greens * blues;
}

/**
 *
 * @param {string} line
 */
function getMinimumSet(line) {
  const result = [0, 0, 0];

  const subsets = getSubsets(line);

  for (const subset of subsets) {
    for (const [index, value] of subset.entries()) {
      if (value > result[index]) result[index] = value;
    }
  }

  return result;
}

async function solution() {
  let result = 0;

  await forEachLine(createReadStream(new URL('./data.txt', import.meta.url)), (line) => {
    result += getPowerToTheSet(getMinimumSet(line));
  });

  return result;
}

solution().then((answer) => {
  console.log(answer);
});
