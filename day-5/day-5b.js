'use strict';

const md5 = require('./md5');
const input = 'ffykfhsq';

let password = 0;
let index = 0;
let map = {};

while (password < 8) {
  let hash = md5(`${input}${index}`).split('');

  if (hash.splice(0, 5).every((char) => {
    return char === '0';
  })) {
    if (!isNaN(parseInt(hash[0])) && hash[0] < 8) {
      map[hash[0]] ? password -= 1 : map[hash[0]] = hash[1];
      password += 1;
    }
  }

  index += 1;
}

console.log(map);
