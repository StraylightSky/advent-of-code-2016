'use strict';

const input = [
  'rect 3x2',
  'rotate column x=1 by 1',
  'rotate row y=0 by 4',
  'rotate column x=1 by 1'
];

const screenSize = [50, 6];
const buildPattern = /\d{0,1}\dx\d/;
const rotatePattern = /((?:x|y)=\d) by (\d)/;
let screen = [[],[],[],[],[],[]];
let pixelCount = 0;

init();

for (let i = 0; i < input.length; i++) {
  let build = buildPattern.exec(input[i]);
  let rotation = rotatePattern.exec(input[i]);

  if (build) {
    let dimensions = build[0].split('x');
    buildRect(dimensions);
  } else {
    rotate(rotation[1], rotation[2]);
  }
}

function init() {
  for (let i = 0; i < screenSize[1]; i++) {
    for (let j = 0; j < screenSize[0]; j++) {
      screen[i].push('.');
    }
    screen[i] = screen[i].join('');
  }
}

function rotate(colrow, amount) {

}

function buildRect(dimensions) {
  for (let i = 0; i < dimensions[1]; i++) {
    screen[i] = screen[i]
      .split('')
      .map((place, idx, arr) => {
        return idx < dimensions[0] ? arr[idx] = '#' : arr[idx] = place;
      })
      .join('');
  }
}

console.log(screen);