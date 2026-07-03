function createPlayer(name, preference) {
  let score = 0;

  const getScore = () => score;
  const increaseScore = () => score++;
  const resetScore = () => (score = 0);

  return {
    name,
    preference,
    getScore,
    increaseScore,
    resetScore,
  };
}

function mark(currentPlayer, button, index, filledPlaces) {
  if (button.textContent !== "") {
    alert("This place on the board is already filled!");
    return true;
  }
  button.textContent = currentPlayer.preference;
  filledPlaces.push({ index, preference: currentPlayer.preference });
  return false;
}

function makeGridVisible(div) {
  div.style.visibility = "visible";
  div.style.display = "grid";
}

function reset(
  player1,
  player2,
  buttons,
  filledPlaces,
  yourScoreField,
  computerScoreField,
  winnerField,
) {
  buttons.forEach((button) => {
    button.textContent = "";
    button.disabled = false;
  });
  yourScoreField.textContent = player1.resetScore();
  computerScoreField.textContent = player2.resetScore();
  winnerField.style.display = "none";
  while (filledPlaces.length > 0) {
    filledPlaces.pop();
  }
}

const playGame = (() => {
  let winner = "";
  const getWinner = () => winner;

  const yourHeader = document.querySelector("#your-header");
  const nameField = document.querySelector("#name");

  nameField.addEventListener("change", (event) => {
    if (event.target.value !== "") {
      yourHeader.textContent = event.target.value;
      nameField.disabled = true;
    }
  });

  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".reset-button");
  const yourScoreField = document.querySelector("#your-score");
  const computerScoreField = document.querySelector("#computer-score");
  const winnerField = document.querySelector("#winner");
  const boardDiv = document.querySelector(".board");
  startButton.addEventListener("click", () => makeGridVisible(boardDiv));

  const buttons = document.querySelectorAll(".element");
  player1 = createPlayer("You", "X");
  player2 = createPlayer("Computer", "O");

  let filledPlaces = [];

  restartButton.addEventListener("click", () => {
    reset(
      player1,
      player2,
      buttons,
      filledPlaces,
      yourScoreField,
      computerScoreField,
      winnerField,
    );
  });

  const getPreferenceAt = (pos) => {
    const item = filledPlaces.find((item) => item.index === pos);
    return item ? item.preference : null;
  };

  function decideWinner(player) {
    if (
      (getPreferenceAt(0) === player.preference &&
        getPreferenceAt(1) === player.preference &&
        getPreferenceAt(2) === player.preference) ||
      (getPreferenceAt(3) === player.preference &&
        getPreferenceAt(4) === player.preference &&
        getPreferenceAt(5) === player.preference) ||
      (getPreferenceAt(6) === player.preference &&
        getPreferenceAt(7) === player.preference &&
        getPreferenceAt(8) === player.preference) ||
      (getPreferenceAt(0) === player.preference &&
        getPreferenceAt(3) === player.preference &&
        getPreferenceAt(6) === player.preference) ||
      (getPreferenceAt(1) === player.preference &&
        getPreferenceAt(4) === player.preference &&
        getPreferenceAt(7) === player.preference) ||
      (getPreferenceAt(2) === player.preference &&
        getPreferenceAt(5) === player.preference &&
        getPreferenceAt(8) === player.preference) ||
      (getPreferenceAt(0) === player.preference &&
        getPreferenceAt(4) === player.preference &&
        getPreferenceAt(8) === player.preference) ||
      (getPreferenceAt(2) === player.preference &&
        getPreferenceAt(4) === player.preference &&
        getPreferenceAt(6) === player.preference)
    ) {
      winner = player.name;
      buttons.forEach((button) => (button.disabled = true));

      player.increaseScore();
      winner.includes("Computer")
        ? (computerScoreField.textContent = player.getScore())
        : (yourScoreField.textContent = player.getScore());
      winnerField.textContent = `${player.name} won!`;
      winnerField.style.display = "block";
      return true;
    }
    return false;
  }

  function decideTie(filledPlaces) {
    if (filledPlaces.length >= 9) {
      winner = "tie!";
      buttons.forEach((button) => (button.disabled = true));
      winnerField.textContent = "It's a tie!";
      winnerField.style.display = "block";
      return true;
    }
    return false;
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const isPlaceFull = mark(player1, button, index, filledPlaces);
      if (isPlaceFull) return;
      if (decideWinner(player1)) return;
      if (decideTie(filledPlaces)) return;

      let randomIndex = Math.floor(Math.random() * 9);
      while (filledPlaces.some((item) => item.index === randomIndex)) {
        randomIndex = Math.floor(Math.random() * 9);
      }

      mark(player2, buttons[randomIndex], randomIndex, filledPlaces);
      console.log(filledPlaces);

      if (decideWinner(player2)) return;
      if (decideTie(filledPlaces)) return;
    });
  });
  return { getWinner };
})();

console.log(playGame.getWinner());
