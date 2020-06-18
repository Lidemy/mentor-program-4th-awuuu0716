/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  const n = Number(input[0].split(' ')[0]);
  const bagMaxWeight = Number(input[0].split(' ')[1]);
  const itemList = input.slice(1);
  const bag = [];
  bag.push(Array.from('0'.repeat(bagMaxWeight + 1)).map(num => Number(num)));

  for (let i = 0; i < n; i++) {
    const itemValue = Number(itemList[i].split(' ')[1]);
    const itemWeight = Number(itemList[i].split(' ')[0]);
    const tempBag = [];

    for (let j = 0; j <= bagMaxWeight; j++) {
      const nextBagValue = itemValue + bag[i][j - itemWeight];
      if (itemWeight > j) {
        tempBag[j] = bag[i][j];
      }
      if (itemWeight < j) {
        if (bag[i][j] < nextBagValue) {
          tempBag[j] = nextBagValue;
        } else {
          tempBag[j] = bag[i][j];
        }
      }
    }
    bag.push(tempBag);
  }
  console.log(bag[n][bagMaxWeight]);
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
