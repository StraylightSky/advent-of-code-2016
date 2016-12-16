'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

const verticalKeys = [
  [5],
  ['A', 6, 2],
  ['D', 'B', 7, 3, 1],
  ['C', 8, 4],
  [9]
];

const horizontalKeys = [
  [1],
  [2, 3, 4],
  [5, 6, 7, 8, 9],
  ['A', 'B', 'C'],
  ['D']
];

let currentKey = 5;
let vertIndex = indexOfKey(verticalKeys, currentKey);
let horizIndex = indexOfKey(horizontalKeys, currentKey);
let currKeyIndex = verticalKeys[vertIndex].indexOf(currentKey)

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    switch (input[i][j]) {
      case 'U':
        currKeyIndex = verticalKeys[vertIndex].indexOf(currentKey);
        if (currKeyIndex !== verticalKeys[vertIndex].length - 1) {
          currKeyIndex += 1;
          currentKey = verticalKeys[vertIndex][currKeyIndex];
          horizIndex = indexOfKey(horizontalKeys, currentKey);
        }
        break;
      case 'D':
        currKeyIndex = verticalKeys[vertIndex].indexOf(currentKey);
        if (currKeyIndex !== 0) {
          currKeyIndex -= 1;
          currentKey = verticalKeys[vertIndex][currKeyIndex];
          horizIndex = indexOfKey(horizontalKeys, currentKey);
        }
        break;
      case 'L':
        currKeyIndex = horizontalKeys[horizIndex].indexOf(currentKey);
        if (currKeyIndex !== 0) {
          currKeyIndex -= 1;
          currentKey = horizontalKeys[horizIndex][currKeyIndex];
          vertIndex = indexOfKey(verticalKeys, currentKey);
        }
        break;
      case 'R':
        currKeyIndex = horizontalKeys[horizIndex].indexOf(currentKey);
        if (currKeyIndex !== horizontalKeys[horizIndex].length - 1) {
          currKeyIndex += 1;
          currentKey = horizontalKeys[horizIndex][currKeyIndex];
          vertIndex = indexOfKey(verticalKeys, currentKey);
        }
        break;
    }
  }
  console.log(currentKey);
}

function indexOfKey(keyArray, key) {
  for (let i = 0; i < keyArray.length; i++) {
    if (keyArray[i].indexOf(key) > -1) {
      return i;
    }
  }
}
