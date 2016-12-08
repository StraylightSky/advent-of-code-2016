'use strict';

// 0 - North
// 1 - East
// 2 - South
// 3 - West

const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');;

const startingState = {
  x: 0,
  y: 0,
  facing: 0
};

let block;
let first = false;
let visited = new Set();

const moves = input.split(', ').map((move) => {
  return {
    turn: move[0],
    distance: parseInt(move.slice(1))
  }
});

function calc(currentState, move) {
  currentState.facing += (move.turn === 'L' ? -1 : 1) + 4;
  const dir = currentState.facing % 4;
  const axis = dir % 2 === 0 ? 'y' : 'x';

  for (let i = 0; i < move.distance; i++) {
    currentState[axis] += (dir > 1 ? -1 : 1);
    
    if (visited.has(`${currentState.x}_${currentState.y}`) && !first) {
      block = Math.abs(currentState.x) + Math.abs(currentState.y);
      first = true;
    }
    visited.add(`${currentState.x}_${currentState.y}`);
  }

  return currentState;
}

const endingState = moves.reduce(calc, startingState);

console.log(Math.abs(endingState.x) + Math.abs(endingState.y));
console.log(block);
