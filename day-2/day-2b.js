'use strict';

const input = require('fs')
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n');

const keypad = [];