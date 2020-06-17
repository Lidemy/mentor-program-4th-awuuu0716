/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  for (let i = 1; i <= Number(input[0]); i++) {
    console.log('*'.repeat(i));
  }
};

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
