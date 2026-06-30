function createPlayer(name, preference) {
  let score = 0;
  let verticalPick;
  let horizontalPick;
  const getVerticalPick = () => verticalPick;
  const setVerticalPick = (pick) => {
    verticalPick = pick;
  };
  const getHorizontalPick = () => horizontalPick;
  const setHorizontalPick = (pick) => {
    horizontalPick = pick;
  };
  const getScore = () => score;
  const increaseScore = () => {
    score++;
  };
  return {
    name,
    preference,
    getScore,
    increaseScore,
    getVerticalPick,
    setVerticalPick,
    getHorizontalPick,
    setHorizontalPick,
  };
}

const createGameBoard = (() => {
  const verticalAxis = 3;
  const horizontalAxis = 3;
  const gameboard = Array.from({ length: verticalAxis }, () =>
    Array(horizontalAxis).fill(),
  );
  return { verticalAxis, horizontalAxis, gameboard };
})();

function mark(currentPlayer, board, row, column) {
  if (board[row][column] !== undefined) {
    console.log("This place on the board is already filled!");
    return true;
  }
  board[row][column] = currentPlayer.preference;
  return false;
}

const playGame = (() => {
  let winner = "";
  function getWinner() {
    return winner;
  }
  player1 = createPlayer("mert", "X");
  player2 = createPlayer("computer", "O");
  createGameBoard;
  const boardSize =
    createGameBoard.verticalAxis * createGameBoard.horizontalAxis;
  const board = createGameBoard.gameboard;
  for (let turn = 0; turn < boardSize; turn++) {
    const currentPlayer = turn % 2 === 0 ? player1 : player2;
    let row, column;
    if (currentPlayer === player1) {
      row = prompt("Please enter a row number between 0-2:");
      column = prompt("Please enter a column number between 0-2:");
    } else {
      row = Math.floor(Math.random() * 3);
      column = Math.floor(Math.random() * 3);
    }

    currentPlayer.setHorizontalPick(row);
    currentPlayer.setVerticalPick(column);
    const isPlaceFull = mark(currentPlayer, board, row, column);
    if (isPlaceFull) {
      turn--;
      continue;
    }

    if (
      (board[0][0] === currentPlayer.preference &&
        board[0][1] === currentPlayer.preference &&
        board[0][2] === currentPlayer.preference) ||
      (board[1][0] === currentPlayer.preference &&
        board[1][1] === currentPlayer.preference &&
        board[1][2] === currentPlayer.preference) ||
      (board[2][0] === currentPlayer.preference &&
        board[2][1] === currentPlayer.preference &&
        board[2][2] === currentPlayer.preference) ||
      (board[0][0] === currentPlayer.preference &&
        board[1][1] === currentPlayer.preference &&
        board[2][2] === currentPlayer.preference) ||
      (board[0][2] === currentPlayer.preference &&
        board[1][1] === currentPlayer.preference &&
        board[2][0] === currentPlayer.preference) ||
      (board[0][0] === currentPlayer.preference &&
        board[1][0] === currentPlayer.preference &&
        board[2][0] === currentPlayer.preference) ||
      (board[0][1] === currentPlayer.preference &&
        board[1][1] === currentPlayer.preference &&
        board[2][1] === currentPlayer.preference) ||
      (board[0][2] === currentPlayer.preference &&
        board[1][2] === currentPlayer.preference &&
        board[2][2] === currentPlayer.preference)
    ) {
      winner = currentPlayer.name;
      break;
    }
    console.log(JSON.parse(JSON.stringify(createGameBoard.gameboard)));
  }
  if (winner === "") {
    winner = "tie!";
  }

  return { getWinner };
})();

console.log(playGame.getWinner());
