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

// ------------------------------------------------------
// Global Variables & Main Game Logic
// ------------------------------------------------------

let width = 8;
let height = 8;
let numMines = 10;
let game;
let totalSeconds = 0;
let paused = false;

// ------------------------------------------------------
// Config & Setup
// ------------------------------------------------------

/**
 * Fetch game configuration from a local JSON file (config.json).
 * Returns a Promise that resolves with a JSON object on success, or rejects on failure.
 * @returns {Promise<Object>} The game configuration object.
 * @throws {Error} If the fetch fails or the response is not OK.
 */
function getGameInfo() {
  return new Promise((resolve, reject) => {
    // TODO: Explore your own fetch logic.
  });
}

/**
 * Entry point when the "Start Game" button is clicked.
 */
startBtn.onclick = async function () {
  await gameSetup();
  gameStart();
};

/**
 * Sets up the game variables and UI before starting the game.
 *
 * Note: You must hanldle the all the errors in the fetch logic.
 */
async function gameSetup() {
  // TODO: fetch the game configuration from config.json
  //       and set the width, height, and numMines variables
  //       based on the fetched data.

  timerIcon.src = "images/icons/timer_black.svg";
  flagIcon.src = "images/icons/flag_black.svg";

  setupTimer();
  setupButtons();

  // TODO: Switch the displayed panels
  // Hit: add the "disable" class to the start section
  //      and remove it from the main game section.
}

/**
 * Set up the timer logic to increase every second unless paused.
 */
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

/**
 * Formats time for the timer display.
 * @param {number} n - The time value in seconds or minutes.
 * @returns {string} A zero-padded string (e.g. "07")
 */
function formatTime(n) {
  n = Math.floor(n);
  return n < 10 ? "0" + n : n;
}

/**
 * Sets up miscellaneous button handlers (like "Start Over" and "Pause").
 */
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

/**
 * Initializes a new Minesweeper game instance and sets up cell event handlers.
 */
function gameStart() {
  // TODO: Initialize a new Minesweeper game instance

  updateFlagCounter();

  // Register event listeners for left and right clicks
  mineField.addEventListener("click", handleCellClick);
  mineField.addEventListener("contextmenu", handleCellRightClick);
}

/**
 * Stops the game and disables all buttons on the board.
 */
function stopGame() {
  // TODO: Implement logic to stop the game.
}

/**
 * Event handler for left-click on the game board.
 * @param {MouseEvent} e
 */
function handleCellClick(e) {
  e.stopPropagation(); // DO NOT remove this, it prevent event bubbling
  // TODO: Implement logic to handle left-click.
  //       This should include:
  //       - Checking if the game is paused
  //       - Checking if the game is over or win
  //       - Revealing the cell
  //       - Updating the flag counter
  // Hit:  the coordinate is stored in the button element
}

/**
 * Event handler for right-click on the game board (place/remove flag).
 * @param {MouseEvent} e
 */
function handleCellRightClick(e) {
  e.preventDefault(); // DO NOT remove this, it prevent the default context menu
  e.stopPropagation(); // DO NOT remove this, it prevent event bubbling

  // TODO: Implement logic to handle right-click.
  //       This should include:
  //       - Checking if the game is paused
  //       - Place or remove a flag on the cell
  //       - Update the flag counter
  // Hit:  the coordinate is stored in the button element
}

/**
 * Updates the flag counter display (flags placed / total mines).
 */
function updateFlagCounter() {
  flagCounter.children[1].textContent = `${game.countFlags()}/${numMines}`;
}
