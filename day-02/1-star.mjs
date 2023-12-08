import { createReadStream } from 'fs';

import { forEachLine } from '../shared/forEachLine.mjs';

import { getSubsets } from './shared.mjs';

/**
 *
 * @param {[number, number, number]} subset
 */
function isSubsetPossible([reds, greens, blues]) {
  return reds <= 12 && greens <= 13 && blues <= 14;
}

/**
 *
 * @param {string} line
 */
function isGamePossible(line) {
  const subsets = getSubsets(line);

  for (const subset of subsets) {
    if (!isSubsetPossible(subset)) {
      return false;
    }
  }

  return true;
}

/**
 *
 * @param {string} line
 */
function getGameId(line) {
  return Number(line.slice('Game '.length, line.indexOf(':')));
}

async function solution() {
  let result = 0;

  await forEachLine(createReadStream(new URL('./data.txt', import.meta.url)), (line) => {
    if (isGamePossible(line)) {
      result += getGameId(line);
    }
  });

  return result;
}

solution().then((sum) => {
  console.log(sum);
});
