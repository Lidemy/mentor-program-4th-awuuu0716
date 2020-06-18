/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

const solve = (input) => {
  const [mapHeight, mapWidth] = [...input[0].split(' ').map(Number)];
  const maze = [];
  const roadOfDone = {};
  const initQueue = [
    {
      height: 0,
      width: 0,
      step: 0,
    },
  ];
  const exit = `H${mapHeight - 1}W${mapWidth - 1}`;

  for (let i = 1; i < input.length; i++) {
    const temp = input[i].split('');
    maze.push(temp);
  }

  function findTheExit(queue) {
    const positionHeight = queue[0].height;
    const positionWidth = queue[0].width;
    const nowAt = `H${positionHeight}W${positionWidth}`;
    const { step } = queue;

    // 隊列是空的,結束遞迴
    if (!queue) {
      return;
    }
    // 檢查是否走過此點
    if (roadOfDone[nowAt]) {
      queue.shift();
      findTheExit(queue);
      return;
    }
    // 檢查是否踩到終點,踩到就 console.log(queue[0].step);
    if (nowAt === exit) {
      console.log(queue[0].step);
      maze[positionHeight][positionWidth] = step;
      return;
    }
    // 將隊列最前面的點標記已踩過
    roadOfDone[nowAt] = true;
    maze[positionHeight][positionWidth] = step;
    // 尋找下一格路
    // down
    if (positionHeight + 1 < mapHeight) {
      if (maze[positionHeight + 1][positionWidth] === '.') {
        queue.push({
          height: positionHeight + 1,
          width: positionWidth,
          step: step + 1,
        });
      }
    }
    // right
    if (positionWidth + 1 < mapWidth) {
      if (maze[positionHeight][positionWidth + 1] === '.') {
        queue.push({
          height: positionHeight,
          width: positionWidth + 1,
          step: step + 1,
        });
      }
    }
    // up
    if (positionHeight - 1 >= 0) {
      if (maze[positionHeight - 1][positionWidth] === '.') {
        queue.push({
          height: positionHeight - 1,
          width: positionWidth,
          step: step + 1,
        });
      }
    }
    // left
    if (positionWidth - 1 >= 0) {
      if (maze[positionHeight][positionWidth - 1] === '.') {
        queue.push({
          height: positionHeight,
          width: positionWidth - 1,
          step: step + 1,
        });
      }
    }
    // 當前的點移出隊列,進行下一次遞迴
    queue.shift();
    findTheExit(queue);
  }
  findTheExit(initQueue);
};

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
