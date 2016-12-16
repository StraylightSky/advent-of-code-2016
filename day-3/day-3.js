'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

let validCount = 0;

for (let i = 0; i < input.length; i++) {
  let sides = input[i].split(' ');
  if (validateTriangle(sides)) {
    validCount += 1;
  }
}

function validateTriangle(sides) {
  let valid = true;

  for (let i = 0; i < 3; i++) {
    valid = valid && 
      parseInt(sides[i]) + parseInt(sides[(i+1) % 3]) > parseInt(sides[(i+2) % 3]);
  }

  return valid;
}

console.log(validCount);
