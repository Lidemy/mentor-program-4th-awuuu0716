/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  const arr = input[0].split(' ');
  for (let i = Number(arr[0]); i < Number(arr[1]); i++) {
    const numArr = i.toString();
    const power = numArr.length;
    let total = 0;
    for (let j = 0; j < power; j++) {
      total += numArr[j] ** power;
    }
    if (total === i) {
      console.log(i);
    }
  }
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
