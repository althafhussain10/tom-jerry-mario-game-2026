// ================================
// VARIABLES
// ================================

const jerry = document.querySelector(".jerry");
const tom = document.querySelector(".tom");
const scoreText = document.getElementById("score");
const gameOver = document.querySelector(".game-over");

let score = 0;
let isAlive = false;
let playerName = "";
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// ================================
// START GAME
// ================================

function startGame() {
  const nameInput = document.getElementById("playerName").value;

  if (nameInput.trim() === "") {
    alert("Please enter your name!");
    return;
  }

  playerName = nameInput;

  // Hide start screen
  document.querySelector(".start-screen").style.display = "none";

  // Show game
  document.querySelector(".game").style.display = "block";

  isAlive = true;
  startCollisionCheck();
}

// ================================
// JUMP FUNCTION
// ================================

function jumpHandler() {
  if (!isAlive) return;

  if (!jerry.classList.contains("jump")) {
    jerry.classList.add("jump");

    // Optional mobile vibration
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    setTimeout(() => {
      jerry.classList.remove("jump");
    }, 600);
  }
}

// Desktop Spacebar
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jumpHandler();
  }
});

// Mobile Touch + Mouse Click
document.addEventListener("touchstart", jumpHandler);
document.addEventListener("click", jumpHandler);

// ================================
// COLLISION DETECTION
// ================================

function startCollisionCheck() {
  const collisionInterval = setInterval(function () {

    if (!isAlive) {
      clearInterval(collisionInterval);
      return;
    }

    const jerryRect = jerry.getBoundingClientRect();
    const tomRect = tom.getBoundingClientRect();

    const isColliding =
      jerryRect.left < tomRect.right &&
      jerryRect.right > tomRect.left &&
      jerryRect.top < tomRect.bottom &&
      jerryRect.bottom > tomRect.top;

    if (isColliding) {
      tom.style.animation = "none";
      isAlive = false;
      gameOver.style.display = "block";
      saveHighScore();
      clearInterval(collisionInterval);
    }

    score++;
    scoreText.innerText = score;

  }, 100);
}

// ================================
// HIGH SCORE SYSTEM
// ================================

function saveHighScore() {
  highScores.push({ name: playerName, score: score });

  highScores.sort((a, b) => b.score - a.score);

  highScores = highScores.slice(0, 5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  displayHighScores();
}

function displayHighScores() {
  const tableBody = document.querySelector("#highScoreTable tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  highScores.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
    `;

    tableBody.appendChild(row);
  });
}

displayHighScores();

// ================================
// RESTART
// ================================

function restart() {
  location.reload();
}