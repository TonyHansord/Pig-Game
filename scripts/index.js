const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const modal = document.querySelector(".wins-modal");
const winnerTitle = document.querySelector(".winner");
const btnNewModal = document.querySelector(".btn--new-modal");

let player1 = {
  classes: document.querySelector(".player--1").classList,
  score: 0,
  scoreLabel: document.getElementById("score--1"),
  currentScore: 0,
  currentScoreLabel: document.getElementById("current--1"),
  isActivePlayer: true,
};

let player2 = {
  classes: document.querySelector(".player--2").classList,
  score: 0,
  scoreLabel: document.getElementById("score--2"),
  currentScore: 0,
  currentScoreLabel: document.getElementById("current--2"),
  isActivePlayer: false,
};

function getRandomDice() {
  return Math.trunc(Math.random() * 6 + 1);
}
function switchPlayer() {
  if (player1.isActivePlayer) {
    player1.currentScore = 0;
    player1.currentScoreLabel.textContent = player1.currentScore;
    player1.classes.remove("player--active");
    player2.classes.add("player--active");
    player1.isActivePlayer = false;
    player2.isActivePlayer = true;
  } else {
    player2.currentScore = 0;
    player2.currentScoreLabel.textContent = player2.currentScore;
    player2.classes.remove("player--active");
    player1.classes.add("player--active");
    player2.isActivePlayer = false;
    player1.isActivePlayer = true;
  }
}
function diceRoll() {
  let diceNum = getRandomDice();
  dice.src = `../assets/dice-${diceNum}.png`;

  if (diceNum === 1) {
    switchPlayer();
  } else {
    if (player1.isActivePlayer) {
      player1.currentScore += diceNum;
      player1.currentScoreLabel.textContent = player1.currentScore;
    } else {
      player2.currentScore += diceNum;
      player2.currentScoreLabel.textContent = player2.currentScore;
    }
  }
}

function showModal() {
  let winner = player1.score >= 100 ? "Player 1" : "Player 2";
  winnerTitle.textContent = `${winner} wins!`;
  document.querySelector(".p1-final-score").textContent = player1.score;
  document.querySelector(".p2-final-score").textContent = player2.score;
  modal.classList.remove("hidden");
}

function holdScore() {
  if (player1.isActivePlayer) {
    player1.score += player1.currentScore;
    player1.scoreLabel.textContent = player1.score;
  } else {
    player2.score += player2.currentScore;
    player2.scoreLabel.textContent = player2.score;
  }

  if (player1.score >= 100 || player2.score >= 100) {
    showModal();
  } else {
    switchPlayer();
  }
}

function initPlayer(player) {
  player.score = 0;
  player.scoreLabel.textContent = 0;
  player.currentScore = 0;
  player.currentScoreLabel.textContent = 0;

  player.isActivePlayer = player === player1 ? true : false;

  if (player.classes.contains("player--active")) {
    player.classes.remove("player--active");
  }
}

function newGame() {
  initPlayer(player1);
  initPlayer(player2);

  player1.classes.add("player--active");
}

function closeModal() {
  newGame();
  modal.classList.add("hidden");
}

btnRoll.addEventListener("click", diceRoll);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", newGame);
btnNewModal.addEventListener("click", closeModal);
