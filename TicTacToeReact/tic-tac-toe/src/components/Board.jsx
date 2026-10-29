
import Cell from "./Cell";

function Board({ cells, onCellClick, winningLine, gameOver }) {
  return (
    <div className="board" role="group" aria-label="Tic-tac-toe board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
}

export default Board;
