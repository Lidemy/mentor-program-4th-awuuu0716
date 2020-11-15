import { BoardImg, Square, BoardContainer } from './style/style';
import boardImg from './image/board.webp';
import { useState, useEffect } from 'react';
import Title from './Title';
import History from './History';
import ChessPlaybook from './ChessPlaybook';
import { initBoard, initHistory } from './utils/utils';

const App = () => {
  const [board, setBoard] = useState(initBoard());
  const [player, setPlayer] = useState('black');
  const [lastPlace, setLastPlace] = useState([]);
  const [winner, setWinner] = useState('');
  const [history, setHistory] = useState(initHistory());

  useEffect(() => {
    handleMatchResult();
  });

  const handleMatchResult = () => {
    if (lastPlace.length === 0) return;
    const lastColor = board[lastPlace[0]][lastPlace[1]].chess
    const diretions = [
      { index: [1, 0], line: 'horizontal' },
      { index: [1, -1], line: 'slash' },
      { index: [0, -1], line: 'vertical' },
      { index: [-1, -1], line: 'backSlash' },
      { index: [-1, 0], line: 'horizontal' },
      { index: [-1, 1], line: 'slash' },
      { index: [0, 1], line: 'vertical' },
      { index: [1, 1], line: 'backSlash' },
    ];
    const result = { horizontal: 1, vertical: 1, slash: 1, backSlash: 1 };
    diretions.forEach((diretion) => {
      const [dx, dy] = diretion.index;
      const line = diretion.line;
      let [nowX, nowY] = lastPlace;
      let [nextX, nextY] = [nowX + dx, nowY + dy];
      if (nextX < 0 || nextX > 18 || nextY < 0 || nextY > 18) return;

      let lastChess = board[nowX][nowY].chess;
      let nextChess = board[nextX][nextY].chess;

      while (nextChess === lastChess) {
        result[line] += 1;
        nowX = nextX;
        nowY = nextY;
        nextX = nowX + dx;
        nextY = nowY + dy;
        if (nextX < 0 || nextX > 18 || nextY < 0 || nextY > 18) break;
        lastChess = board[nowX][nowY].chess;
        nextChess = board[nextX][nextY].chess;
      }
    });
    for (const line in result) {
      if (result[line] === 5) {
        setWinner(lastColor);
      }
    }
  };

  const handlePlaceChess = (id) => () => {
    const oldPlaybook = history[history.length - 1].playbook;
    let newPlaybook;
    const nextBoard = board.map((row) =>
      row.map((square) => {
        if (square.id !== id) return square;
        newPlaybook = `${String.fromCharCode(65 + square.index[0])}${
          square.index[1] + 1
        } ${player}`;
        setLastPlace(square.index);
        return {
          ...square,
          isClicked: true,
          chess: player,
        };
      })
    );
    setHistory([
      ...history,
      {
        pastBoard: board,
        pastPlayer: player,
        pastLastPlace: lastPlace,
        pastWinner: winner,
        playbook: [...oldPlaybook, newPlaybook],
      },
    ]);
    setBoard(nextBoard);
    setPlayer(player === 'black' ? 'white' : 'black');
  };

  const handleRestartMatch = () => {
    setBoard(initBoard());
    setPlayer('black');
    setLastPlace([]);
    setWinner('');
    setHistory(initHistory());
  };

  const handleReturnToThePast = (historyIndex) => () => {
    const { pastBoard, pastPlayer, pastLastPlace, pastWinner } = history[
      historyIndex
    ];
    setHistory(history.slice(0, historyIndex));
    setBoard(pastBoard);
    setPlayer(pastPlayer);
    setWinner(pastWinner);
    setLastPlace(pastLastPlace);
  };

  return (
    <>
      <BoardContainer>
        <BoardImg src={boardImg} draggable={false} />
        <History history={history.slice(1)} returnBtn={handleReturnToThePast} />
        <ChessPlaybook playbook={history[history.length - 1].playbook} />
        <Title winner={winner} player={player} restart={handleRestartMatch} />
        {board.map((row) =>
          row.map((square) => (
            <Square
              $coordX={square.coord[0]}
              $coordY={square.coord[1]}
              key={square.id}
              $color={square.chess}
              onClick={
                square.isClicked || winner ? null : handlePlaceChess(square.id)
              }
            />
          ))
        )}
      </BoardContainer>
    </>
  );
};

export default App;
