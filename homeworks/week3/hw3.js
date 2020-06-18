/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  const numbers = input.slice(1).map(Number);
  numbers.forEach((element) => {
    if (element === 1) {
      console.log('Composite');
      return;
    }

    for (let i = 2; i < element; i++) {
      if (element % i === 0) {
        console.log('Composite');
        return;
      }
    }
    console.log('Prime');
  });
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
