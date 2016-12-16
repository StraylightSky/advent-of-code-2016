'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

const pattern = /\[([a-z]+)\]/;
let supportsSSLCount = 0;

for (let i = 0; i < input.length; i++) {
  let parts = input[i].split(pattern);
  let hypernetSequences = [];
  let supernetSequences = [];

  parts.map((seq, idx) => {
    return idx % 2 === 0 ? supernetSequences.push(seq) : hypernetSequences.push(seq); 
  });

  supernetSequences = supernetSequences.filter((sequence) => {
    return supportsSSL(sequence, hypernetSequences);
  });

  if (supernetSequences.length > 0) {
    supportsSSLCount += 1;
  }
}

function supportsSSL(sequence, hypernetSequences) {
  for (let i = 0; (i+2) < sequence.length; i++) {
    let candidate = `${sequence[i]}${sequence[i+1]}${sequence[i+2]}`;

    if (candidate.split('').reverse().join('') === candidate) {
      let BABCandidate = `${sequence[i+1]}${sequence[i]}${sequence[i+1]}`;

      if (isBAB(BABCandidate, hypernetSequences)) {
        return true;
      }
    }
  }

  return false;
}

function isBAB(candidate, hypernetSequences) {
  for (let i = 0; i < hypernetSequences.length; i++) {
    if (hypernetSequences[i].indexOf(candidate) > -1) {
      return true;
    }
  }

  return false;
}

console.log(supportsSSLCount);