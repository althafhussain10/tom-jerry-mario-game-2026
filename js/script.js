const jerry = document.querySelector(".jerry");
const tom = document.querySelector(".tom");
const scoreText = document.getElementById("score");
const gameOver = document.querySelector(".game-over");

let score = 0;
let isAlive = true;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!jerry.classList.contains("jump")) {
      jerry.classList.add("jump");
      setTimeout(() => {
        jerry.classList.remove("jump");
      }, 600);
    }
  }
});

document.addEventListener("touchstart", jumpHandler);
document.addEventListener("click", jumpHandler);

function jumpHandler() {
  if (!jerry.classList.contains("jump")) {
    jerry.classList.add("jump");
    setTimeout(() => {
      jerry.classList.remove("jump");
    }, 600);
  }
}

let checkCollision = setInterval(function () {

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
    clearInterval(checkCollision);
  }

  if (isAlive) {
    score++;
    scoreText.innerText = score;
  }

}, 100);

function restart() {
  location.reload();
}