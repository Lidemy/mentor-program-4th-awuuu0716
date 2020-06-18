const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  const str1 = input[0];
  const str2 = input[0].split('').reverse().join('');
  if (str1 === str2) {
    console.log('True');
  } else {
    console.log('False');
  }
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
