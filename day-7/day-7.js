'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n'); 

const pattern = /\[([a-z]+)\]/;
let supportsTLSCount = 0;

for (let i = 0; i < input.length; i++) {
  let parts = input[i].split(pattern);
  let hypernetSequences = [];
  let supernetSequences = [];

  parts.map((seq, idx) => {
    return idx % 2 === 0 ? supernetSequences.push(seq) : hypernetSequences.push(seq); 
  });

  hypernetSequences = hypernetSequences.filter((sequence) => {
    return isABBA(sequence);
  });

  supernetSequences = supernetSequences.filter((sequence) => {
    return isABBA(sequence);
  });

  if (hypernetSequences.length === 0 && supernetSequences.length > 0) {
    supportsTLSCount += 1;
  }
}

function isABBA(sequence) {
  for (let i = 0; i < sequence.length - 1; i++) {
    let pair = [sequence[i], sequence[i+1]];
    let candidate = pair.join('') + pair.reverse().join('');

    if (pair[0] !== pair[1] && sequence.indexOf(candidate) > -1) {
      return true;
    }
  }

  return false;
}

console.log(supportsTLSCount);