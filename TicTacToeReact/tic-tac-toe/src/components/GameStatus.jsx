
function GameStatus({ winner, isDraw, currentPlayer }) {
  if (winner) {
    return (
      <p className="status status-result">
        Player <span className={`mark-${winner.toLowerCase()}`}>
          {winner}
        </span>{" "}
        wins!
      </p>
    );
  }

  if (isDraw) {
    return <p className="status status-result">It's a draw!</p>;
  }

  return (
    <p className="status">
      Current turn:{" "}
      <span className={`mark-${currentPlayer.toLowerCase()}`}>
        {currentPlayer}
      </span>
    </p>
  );
}

export default GameStatus;
