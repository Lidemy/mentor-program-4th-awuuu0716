/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* global BigInt */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  for (let i = 1; i < input.length; i++) {
    const arr = input[i].split(' ');
    const numA = BigInt(arr[0]);
    const numB = BigInt(arr[1]);

    if (arr[2] === '1') {
      if (numA > numB) {
        console.log('A');
      } else if (numA < numB) {
        console.log('B');
      } else {
        console.log('DRAW');
      }
    } else if (arr[2] === '-1') {
      if (numA > numB) {
        console.log('B');
      } else if (numA < numB) {
        console.log('A');
      } else {
        console.log('DRAW');
      }
    }
  }
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
