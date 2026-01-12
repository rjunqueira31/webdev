let winningScore = 3;

function checkWin(playerElement) {
  const scoreElement = playerElement.querySelector(".score");
  let score = parseInt(scoreElement.textContent, 10);
  const player_name = playerElement.querySelector("h2").textContent;
  if (score >= winningScore) {
    alert(`${player_name} wins!`);
    return false;
  }
  return true;
}

function updateScore(playerElement, delta) {
  const scoreElement = playerElement.querySelector(".score");
  let score = parseInt(scoreElement.textContent, 10);
  score += delta;
  scoreElement.textContent = score;
  return score;
}

function decreaseScore(playerElement) {
  updateScore(playerElement, -1);
}

function increaseScore(playerElement) {
  return updateScore(playerElement, 1);
}

const player_1 = document.getElementById("player1");

player_1.querySelector(".btn-increase").addEventListener("click", () => {
  const score = increaseScore(player_1);
  setTimeout(() => checkWin(player_1), 500);
});

player_1.querySelector(".btn-decrease").addEventListener("click", () => {
  decreaseScore(player_1);
});

const player_2 = document.getElementById("player2");

player_2.querySelector(".btn-increase").addEventListener("click", () => {
  const score = increaseScore(player_2);
});

player_2.querySelector(".btn-decrease").addEventListener("click", () => {
  decreaseScore(player_2);
});

const resetbtn = document.getElementById("reset-btn");

resetbtn.addEventListener("click", () => {
  player_1.querySelector(".score").textContent = "0";
  player_2.querySelector(".score").textContent = "0";
});

const scoreInput = document.getElementById("WinVal");

scoreInput.addEventListener("change", () => {
  winningScore = parseInt(scoreInput.value, 10);
});

const randbtn = document.getElementById("rand-btn");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

randbtn.addEventListener("click", async () => {
  player_1.querySelector(".score").textContent = "0";
  player_2.querySelector(".score").textContent = "0";

  while (checkWin(player_1) && checkWin(player_2)) {
    if (Math.random() < 0.5) {
      increaseScore(player_1);
    } else {
      increaseScore(player_2);
    }
    await sleep(1000);
  }
});
