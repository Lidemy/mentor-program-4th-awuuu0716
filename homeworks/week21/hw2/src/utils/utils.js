export const initBoard = () => {
  const boardArray = [];
  const blockWidth = 39.3;
  const blockHeight = 41.5;
  const [startX, startY] = [80, 89];
  // 因應畫面上棋盤式從 1 開始算位置, 此處 i 與 j 從 1 開始算
  for (let i = 1; i < 20; i += 1) {
    const tempArr = [];
    const coordY = Math.floor(startY + (i - 1) * blockHeight);
    for (let j = 1; j < 20; j += 1) {
      const id = String.fromCharCode(65 + (i - 1)) + j;
      const coordX = Math.floor(startX + (j - 1) * blockWidth);
      tempArr.push({
        coord: [coordX, coordY],
        id,
        isClicked: false,
        chess: 'none',
        index: [i - 1, j - 1],
      });
    }
    boardArray.push(tempArr);
  }
  return boardArray;
};

export const initHistory = () => [
  {
    board: [],
    player: '',
    lastPlace: [],
    winner: '',
    playbook: [],
  },
];
