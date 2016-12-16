'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .join('');

let errorCorrectedMessage = [];
let originalMessage = [];

for (let j = 0; j < 8; j++) {
  let map = {};
  let sortablePairs = [];

  for (let i = 0; i < input.length; i += 8) {
    map[input[i+j]] ? map[input[i+j]] += 1 : map[input[i+j]] = 1;
  }

  for (let letter in map) {
    sortablePairs.push([letter, map[letter]]);
  }

  sortablePairs.sort((a, b) => {
    return b[1] - a[1];
  })
  .slice(0, 1)
  .map((pairs) => {
    return errorCorrectedMessage.push(pairs[0]);
  });

  sortablePairs.sort((a, b) => {
    return a[1] - b[1];
  })
  .slice(0, 1)
  .map((pairs) => {
    return originalMessage.push(pairs[0]);
  });
}

console.log(
  `Error corrected message: ${errorCorrectedMessage.join('')}.`,
  `Original message: ${originalMessage.join('')}`
);