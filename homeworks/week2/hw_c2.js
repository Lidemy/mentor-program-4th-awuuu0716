function solve(lines) {
  let maze = lines.map((n) => n.split(""));
  let [mapHeight, mapWidth] = [maze.length - 1, maze[0].length - 1];
  let exit = "W" + maze[maze.length - 1].indexOf(".") + "H" + mapHeight;
  let roadOfDone = {};
  let queue = [
    {
      x: 0,
      y: maze[0].indexOf("."),
      step: 0,
    },
  ];
  let dir = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];

  (function findTheExit(queue) {
    //隊列長度為0代表找到出口了,結束遞迴
    if (queue.length == 0) return;
    //取出當前位置,到此點的步數
    let { x, y, step } = queue.shift();
    let nowAt = "W" + x + "H" + y;
    //到終點了就結束遞迴
    if (nowAt == exit) {
      console.log(step);
      queue = [];
      return;
    }
    //將此點標記為已走過
    roadOfDone[nowAt] = true;
    //開始找路
    for (let d of dir) {
      let newX = x + d.dx;
      let newY = y + d.dy;
      let nextAt = "W" + newX + "H" + newY;
      if (
        newX > mapWidth ||
        newX < 0 ||
        newY > mapHeight ||
        newY < 0 ||
        maze[newY][newX] !== "." ||
        roadOfDone[nextAt]
      )
        continue;
      queue.push({ x: newX, y: newY, step: step + 1 });
    }
    findTheExit(queue);
  })(queue);
}

solve([
  "#.########",
  "#........#",
  "###..#..##",
  "#....#..##",
  "#..###...#",
  "#.#..#...#",
  "#.#....#.#",
  "#.########",
  "#........#",
  "########.#",
]);
