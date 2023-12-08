/**
 *
 * @param {string} stringSubset
 */
function extractSubset(stringSubset) {
  const result = [0, 0, 0];

  for (const value of stringSubset.split(',')) {
    for (const [index, color] of ['red', 'green', 'blue'].entries()) {
      if (value.includes(color)) {
        result[index] = parseInt(value, 10);
      }
    }
  }

  return result;
}

/**
 * Возвращает список наборов кубов.
 *
 * Порядок: красные, зеленые, синие
 *
 * @param {string} line
 * @returns {Array<[number, number, number]>}
 */
export function getSubsets(line) {
  const subsetsOnly = line.split(': ')[1];
  const stringifiedSubsets = subsetsOnly.split('; ');

  const result = [];

  for (const stringSubset of stringifiedSubsets) {
    result.push(extractSubset(stringSubset));
  }

  return result;
}
