import { useState } from 'react';

import Player from './Components/Player/Player';
import GameBoard from './Components/GameBoard';
import Log from './Components/Log';
import { WINNING_COMBINATIONS } from './Components/winning-combinations';
import GameOver from './Components/Gameover';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  //gameBoard라는 변수에 초기 게임보드를 복사한다.
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaure = gameBoard[combination[0].row][combination[0].column];
    const secondSqaure = gameBoard[combination[1].row][combination[1].column];
    const thirdSqaure = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqaure &&
      firstSqaure === secondSqaure &&
      firstSqaure === thirdSqaure
    ) {
      winner = players[firstSqaure];
    }
  }
  return winner;
}

//player의 symbol을 결정하는 함수
function driveActivePlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = driveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handlePlayerChange} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
