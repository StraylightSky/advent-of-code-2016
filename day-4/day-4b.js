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

let realRooms = data.map((data) => {
  return checkIfReal(data.name, data.checksum, data.sector_id);
})
.filter((rooms) => {
  return rooms;
});

let decryptedNames = realRooms.map((room) => {
  return decrypt(room.name, room.sector_id);
});

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

  return mostCommonLetters === checksum ? { name: name, sector_id: sectorID} : false;
}

function decrypt(name, sectorID) {
  let shift = sectorID % 26;
  let decryptedNames = [];

  for (let i = 0; i < name.length; i++) {
    let dName = name[i].split('').map((letter) => {
      return letter.charCodeAt(0) + shift > 122
        ? String.fromCharCode(letter.charCodeAt(0) - 26 + shift)
        : String.fromCharCode(letter.charCodeAt(0) + shift)
    });
    decryptedNames.push(dName.join(''));
  }
  return { name: decryptedNames.join(' '), sector_id: sectorID };
}

console.log(decryptedNames);