import { Minesweeper } from "./classes.js";
import {
  startBtn,
  flagIcon,
  timerIcon,
  startSection,
  mainGame,
  flagCounter,
  startOver,
  pauseBtn,
  timer,
  mineField,
} from "./DOM_element.js";

let width = 8;
let height = 8;
let numMines = 10;
let game;
let totalSeconds = 0;
let paused = false;

function getGameInfo() {
  return new Promise((resolve, reject) => {
    fetch("../config.json")
      .then((response) => {
        if (!response.ok) {
          reject(
            new Error(
              "Failed to read config.json, status code: " + response.status
            )
          );
        } else {
          return response.json();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

startBtn.onclick = async function () {
  await gameSetup();
  gameStart();
};

async function gameSetup() {
  try {
    const gameInfo = await getGameInfo();
    // If valid config data is found, override defaults.
    if (gameInfo && gameInfo.width && gameInfo.height && gameInfo.numMines) {
      width = parseInt(gameInfo.width);
      height = parseInt(gameInfo.height);
      numMines = parseInt(gameInfo.numMines);
    } else {
      alert("Failed to load configuration, using default settings");
    }
  } catch (err) {
    alert(err.message + "\nUsing default settings.");
  }

  timerIcon.src = "images/icons/timer_black.svg";
  flagIcon.src = "images/icons/flag_black.svg";

  setupTimer();
  setupButtons();

  startSection.classList.add("disable");
  mainGame.classList.remove("disable");
}

function setupTimer() {
  totalSeconds = 0;
  paused = false;

  setInterval(() => {
    if (!paused) totalSeconds++;
    timer.children[1].textContent = `${formatTime(
      totalSeconds / 60
    )}:${formatTime(totalSeconds % 60)}`;
  }, 1000);
}

function formatTime(n) {
  n = Math.floor(n);
  return n < 10 ? "0" + n : n;
}

function setupButtons() {
  startOver.onclick = function () {
    if (window.confirm("Do you want to start a new game?")) {
      location.reload();
    }
  };

  pauseBtn.onclick = function () {
    paused = !paused;
  };
}

function gameStart() {
  console.log("game start");
  game = new Minesweeper(width, height, numMines);
  updateFlagCounter();

  mineField.addEventListener("click", handleCellClick);
  mineField.addEventListener("contextmenu", handleCellRightClick);
}

function stopGame() {
  paused = true;
  const buttons = document.querySelectorAll(".cell");
  for (const button of buttons) {
    button.disabled = true;
  }
}

function handleCellClick(e) {
  e.stopPropagation();
  if (paused) return;
  if (e.target.className === "cell") {
    const x = e.target.row;
    const y = e.target.col;
    const result = game.choose(x, y);
    if (result === -1) {
      stopGame();
      game.over();
    } else if (result === 1) {
      stopGame();
      game.win();
    }
    game.display();
    updateFlagCounter();
  }
}

function handleCellRightClick(e) {
  e.preventDefault();
  e.stopPropagation();
  if (paused) return;
  if (e.target.className === "cell") {
    const x = e.target.row;
    const y = e.target.col;
    game.flag(x, y);
    game.display();
    updateFlagCounter();
  }
}

function updateFlagCounter() {
  flagCounter.children[1].textContent = `${game.countFlags()}/${numMines}`;
}
