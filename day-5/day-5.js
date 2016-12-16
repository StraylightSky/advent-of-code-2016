'use strict';

const md5 = require('./md5');
const input = 'ffykfhsq';

let password = '';
let index = 0;

while (password.length < 8) {
  let hash = md5(`${input}${index}`).split('');

  if (hash.splice(0, 5).every((char) => {
    return char === '0';
  })) {
    password += (hash[0]);
  }

  index += 1;
}

console.log(password);