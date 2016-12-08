const input = 'L3, R2, L5, R1, L1, L2, L2, R1, R5, R1, L1, L2, R2, R4, L4, L3, L3, R5, L1, R3, L5, L2, R4, L5, R4, R2, L2, L1, R1, L3, L3, R2, R1, L4, L1, L1, R4, R5, R1, L2, L1, R188, R4, L3, R54, L4, R4, R74, R2, L4, R185, R1, R3, R5, L2, L3, R1, L1, L3, R3, R2, L3, L4, R1, L3, L5, L2, R2, L1, R2, R1, L4, R5, R4, L5, L5, L4, R5, R4, L5, L3, R4, R1, L5, L4, L3, R5, L5, L2, L4, R4, R4, R2, L1, L3, L2, R5, R4, L5, R1, R2, R5, L2, R4, R5, L2, L3, R3, L4, R3, L2, R1, R4, L5, R1, L5, L3, R4, L2, L2, L5, L5, R5, R2, L5, R1, L3, L2, L2, R3, L3, L4, R2, R3, L1, R2, L5, L3, R4, L4, R4, R3, L3, R1, L3, R5, L5, R1, R5, R3, L1';

// 0 - North
// 1 - East
// 2 - South
// 3 - West

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
  let dir = currentState.facing % 4;
  let axis = dir % 2 === 0 ? 'y' : 'x';

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