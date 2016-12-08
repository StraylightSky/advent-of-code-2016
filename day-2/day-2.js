'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let currentPosition = [1, 1];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    switch (input[i][j]) {
      case 'U':
        currentPosition[0] !== 0 ? currentPosition[0] -= 1 : false;
        break;
      case 'D':
        currentPosition[0] !== 2 ? currentPosition[0] += 1 : false;
        break;
      case 'L':
        currentPosition[1] !== 0 ? currentPosition[1] -= 1 : false;
        break;
      case 'R':
        currentPosition[1] !== 2 ? currentPosition[1] += 1 : false;
        break;
    }
  }
  console.log(keypad[currentPosition[0]][currentPosition[1]]);
}
