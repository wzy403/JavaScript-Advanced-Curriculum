let timeLeft = 30;
let score = 0;
let timerId = null;
let aimTimer = null;

const timeSpan = document.getElementById("time");
const scoreSpan = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameBoard = document.getElementById("gameBoard");

const targetsCount = 9;
for (let i = 0; i < targetsCount; i++) {
  const target = document.createElement("div");
  target.classList.add("target");

  const aim = document.createElement("div");
  aim.classList.add("aim");
  aim.addEventListener("click", () => {
    if (aim.classList.contains("active")) {
      score++;
      scoreSpan.textContent = score;
      aim.classList.remove("active");
    }
  });

  target.appendChild(aim);
  gameBoard.appendChild(target);
}

function startGame() {
  timeLeft = 30;
  score = 0;
  timeSpan.textContent = timeLeft;
  scoreSpan.textContent = score;

  timerId = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      endGame();
    }
  }, 1000);

  aimTimer = setInterval(() => {
    const allTarget = document.querySelectorAll(".aim");
    allTarget.forEach((m) => m.classList.remove("active"));

    const randomIndex = Math.floor(Math.random() * targetsCount);
    allTarget[randomIndex].classList.add("active");
  }, 1000);
}

function endGame() {
  clearInterval(aimTimer);
  clearInterval(timerId);
  timerId = null;
  timeSpan.textContent = 30;
  aimTimer = null;
  const allTarget = document.querySelectorAll(".aim");
  allTarget.forEach((m) => m.classList.remove("active"));
  alert(`Time up! Your score is: ${score}`);
}

startBtn.addEventListener("click", () => {
  if (!timerId && !aimTimer) {
    startGame();
  }
});

restartBtn.addEventListener("click", () => {
  if (timerId || aimTimer) endGame();
});
