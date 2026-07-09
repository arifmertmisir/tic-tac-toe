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

export { createPlayer, mark, makeGridVisible, reset };
