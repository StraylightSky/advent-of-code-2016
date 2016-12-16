'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

const pattern = /\[([a-z]+)\]/;
let checksum;

let data = input.map((sequence) => {
  return {
    checksum: pattern.exec(sequence)[1],
    name: sequence.split(checksum)[0].split('-').reverse().slice(1).reverse(),
    sector_id: parseInt(sequence.split(checksum)[0].split('-').reverse().slice(0, 1))
  }
});

let realRoomSectorIDs = data.map((data) => {
  return checkIfReal(data.name, data.checksum, data.sector_id);
})
.reduce((a, b) => {
  return a + b;
}, 0);

function checkIfReal(name, checksum, sectorID) {
  let map = {};
  let sortablePairs = [];

  name.map((parts) => {
    parts.split('').map((letter) => {
      return map[letter] ? map[letter] += 1 : map[letter] = 1;
    });
  });

  for (let letter in map) {
    sortablePairs.push([letter, map[letter]]);
  }

  let mostCommonLetters = sortablePairs.sort((a, b) => {
    if (b[1] - a[1] === 0) {
      return a[0].charCodeAt(0) < b[0].charCodeAt(0) ? -1 : 1;
    }
    return b[1] - a[1];
  })
  .slice(0, 5)
  .map((pairs) => {
    return pairs[0];
  })
  .join('');

  return mostCommonLetters === checksum ? sectorID : 0;
}

console.log(realRoomSectorIDs);
