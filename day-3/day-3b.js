'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

let validCount = 0;
let triplets = [];
let newSides = [];

for (let i = 0; i < input.length; i += 3) {
  if (i % 3 === 0) {
    triplets = input.slice(i, i+3);

    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < triplets.length; j++) {
        let cols = triplets[j].split(' ');
        newSides.push(cols[k]);
      }

      if (validateTriangle(newSides)) {
        validCount += 1;
      }

      newSides = [];
    }
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
