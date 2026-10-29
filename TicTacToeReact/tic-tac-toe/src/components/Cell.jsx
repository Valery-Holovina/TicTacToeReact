
function Cell({ value, onClick, isWinning, gameOver }) {
  return (
    <button
      className={`cell ${value ? `cell-${value.toLowerCase()}` : ""} ${
        isWinning ? "cell-winning" : ""
      }`}
      onClick={onClick}
      disabled={Boolean(value) || gameOver}
      aria-label={value ? `Cell: ${value}` : "Empty cell"}
    >
      {value}
    </button>
  );
}

export default Cell;
