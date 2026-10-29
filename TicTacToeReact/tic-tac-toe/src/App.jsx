
import { useState } from "react";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_SCORE = { X: 0, O: 0, draws: 0 };

function loadScore() {
  try {
    const saved = localStorage.getItem("tic-tac-toe-score");

    if (!saved) return INITIAL_SCORE;

    const parsed = JSON.parse(saved);

    if (
      typeof parsed.X !== "number" ||
      typeof parsed.O !== "number" ||
      typeof parsed.draws !== "number"
    ) {
      return INITIAL_SCORE;
    }

    return parsed;
  } catch {
    return INITIAL_SCORE;
  }
}

function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState(loadScore);

  const gameOver = Boolean(winner) || isDraw;

  function handleCellClick(index) {
    if (cells[index] || gameOver) return;

    const nextCells = [...cells];
    nextCells[index] = currentPlayer;
    setCells(nextCells);

    const line = WINNING_LINES.find(([a, b, c]) => {
      return (
        nextCells[a] &&
        nextCells[a] === nextCells[b] &&
        nextCells[a] === nextCells[c]
      );
    });

    if (line) {
      setWinner(currentPlayer);
      setWinningLine(line);

      const nextScore = {
        ...score,
        [currentPlayer]: score[currentPlayer] + 1,
      };

      setScore(nextScore);
      localStorage.setItem(
        "tic-tac-toe-score",
        JSON.stringify(nextScore)
      );
      return;
    }

    if (nextCells.every((cell) => cell !== null)) {
      setIsDraw(true);

      const nextScore = {
        ...score,
        draws: score.draws + 1,
      };

      setScore(nextScore);
      localStorage.setItem(
        "tic-tac-toe-score",
        JSON.stringify(nextScore)
      );
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function handleNewGame() {
    setCells(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  }

  function handleResetScore() {
    const nextScore = { ...INITIAL_SCORE };
    setScore(nextScore);
    localStorage.setItem(
      "tic-tac-toe-score",
      JSON.stringify(nextScore)
    );
  }

  return (
    <main className="app">
      <section className="game-card">
        <p className="eyebrow">TWO PLAYERS · ONE BOARD</p>
        <h1>Tic-Tac-Toe</h1>
        <p className="subtitle">
          A little strategy goes a long way.
        </p>

        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
        />

        <Board
          cells={cells}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          gameOver={gameOver}
        />

        <button
          className="new-game-button"
          onClick={handleNewGame}
        >
          <span aria-hidden="true">↻</span> New game
        </button>

        <section className="score-section" aria-label="Scoreboard">
          <h2>Scoreboard</h2>

          <div className="scoreboard">
            <div className="score-item">
              <span className="score-symbol mark-x">X</span>
              <span className="score-label">Player X</span>
              <strong>{score.X}</strong>
            </div>

            <div className="score-item">
              <span className="score-symbol mark-o">O</span>
              <span className="score-label">Player O</span>
              <strong>{score.O}</strong>
            </div>

            <div className="score-item">
              <span className="score-symbol draw-symbol">=</span>
              <span className="score-label">Draws</span>
              <strong>{score.draws}</strong>
            </div>
          </div>

          <button
            className="reset-score-button"
            onClick={handleResetScore}
          >
            Reset score
          </button>
        </section>
      </section>

      <footer>Made for two. Enjoy the game!</footer>
    </main>
  );
}

export default App;

