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
        // TODO: Implement the logic for when an aim is clicked
    });

    target.appendChild(aim);
    gameBoard.appendChild(target);
}

function startGame() {
    // TODO: Initialize game variables and UI elements

    timerId = setInterval(() => {
        // TODO: Update the timer and check if time is up
    }, 1000);

    aimTimer = setInterval(() => {
        // TODO: Randomly activate one of the targets
    }, 1000);
}

function endGame() {
    // TODO: Clear intervals, reset UI elements, and show the final score
}

startBtn.addEventListener("click", () => {
    // TODO: Start the game if it is not already running
});

restartBtn.addEventListener("click", () => {
    // TODO: End the game if it is running and reset the game state
});
