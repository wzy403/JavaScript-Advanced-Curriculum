import shuffle from "./utils.js";
import { mineField } from "./DOM_element.js";

// ------------------------------------------------------
// Cell Class
// ------------------------------------------------------

/**
 * Represents a single cell in the Minesweeper grid.
 * Each cell has:
 *  - isMine: Whether it contains a mine
 *  - adjacentMines: Number of mines in adjacent cells
 *  - shown: Whether the cell has been revealed
 *  - flagged: Whether a flag is placed on the cell
 *  - button: The DOM element (button) associated with the cell
 */
class Cell {
  constructor() {
    // TODO: Initialize all properties
  }

  /**
   * Toggles the flag state of this cell.
   */
  flag() {
    // TODO: Implement logic to toggle the flagged state.
  }

  /**
   * Updates the button's display type based on cell state.
   */
  display() {
    // TODO: Update the button's appearance based on whether the cell is shown, flagged, or contains a mine.
  }
}

// ------------------------------------------------------
// Minesweeper Class
// ------------------------------------------------------

/**
 * Core class that manages the Minesweeper game state and behaviors.
 * @property {number} width - Number of columns in the grid.
 * @property {number} height - Number of rows in the grid.
 * @property {number} numMines - Total number of mines in the grid.
 * @property {Array<Array<Cell>>} board - 2D array storing the Cell objects.
 * @property {number} successCount - Tracks how many cells have been safely revealed.
 *
 */
export class Minesweeper {
  /**
   * @param {number} width - Grid width.
   * @param {number} height - Grid height.
   * @param {number} numMines - Number of mines.
   */
  constructor(width, height, numMines) {
    // TODO: Initialize all properties
    this.init();
  }

  /**
   * Initializes the Minesweeper board:
   * 1) Create the board structure.
   * 2) Place mines randomly.
   * 3) Calculate adjacent mines for each cell.
   * 4) Display the initial state.
   */
  init() {
    this.createBoard();
    this.placeMines();
    this.countAllAdjacentMines();
    this.display();
  }

  /**
   * Creates the HTML elements (table rows, cells, etc.) for the game board.
   * Initializes the board array with Cell objects.
   *
   */
  createBoard() {
    // Clear any existing board
    mineField.innerHTML = "";

    // Insert column number headers
    const colNums = document.createElement("tr");
    for (let i = -1; i < this.width; i++) {
      const colNum = document.createElement("th");
      colNums.appendChild(colNum);
      if (i === -1) continue;
      colNum.textContent = String(i);
    }
    mineField.appendChild(colNums);

    this.board = [];
    for (let i = 0; i < this.height; i++) {
      const row = document.createElement("tr");

      // Insert row number headers
      const rowNum = document.createElement("th");
      rowNum.textContent = String(i);
      row.appendChild(rowNum);

      this.board.push([]);
      for (let j = 0; j < this.width; j++) {
        const td = document.createElement("td");
        const button = document.createElement("button");
        button.setAttribute("class", "cell");
        button.setAttribute("type", "mine0");
        button["row"] = i; // storing the row index in the button
        button["col"] = j; // storing the col index in the button
        td.appendChild(button);
        row.appendChild(td);

        let cell = new Cell();
        cell.button = button;
        this.board[i].push(cell);
      }
      mineField.appendChild(row);
    }
  }

  /**
   * Randomly places mines on the board.
   */
  placeMines() {
    // TODO: Implement logic to randomly place mines on the board.
  }

  /**
   * Updates the adjacentMines property for every cell in the grid.
   */
  countAllAdjacentMines() {
    // TODO: Implement logic to count adjacent mines for each cell.
  }

  /**
   * Counts the number of mines adjacent to the specified cell.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @returns {number} The number of adjacent mines.
   */
  countAdjacentMines(row, col) {
    let counter = 0;
    // TODO: Implement logic to count adjacent mines.
    return counter;
  }

  /**
   * Handles the player's action of revealing a cell (left click).
   * - If the first reveal hits a mine or an adjacent cell with mines > 0,
   *   re-initialize the game until you get a safe start.
   * - If it's a mine, then send game over single.
   * - If it's safe, reveals all connected safe areas.
   * @param {number} row - Row index of the chosen cell.
   * @param {number} col - Column index of the chosen cell.
   * @returns {number} 1 if player win, 0 if the game continues, -1 if game over.
   */
  choose(row, col) {
    // TODO: Implement logic for revealing a cell.
  }

  /**
   * Checks if a given row, col index is within the board bounds.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @returns {boolean}
   */
  isCellIndex(row, col) {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  /**
   * Checks if a cell is a mine.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @returns {boolean}
   */
  isMine(row, col) {
    return this.isCellIndex(row, col) && this.board[row][col].isMine;
  }

  /**
   * Reveals all cells (used at game over or upon winning).
   */
  showAll() {
    for (const row of this.board) {
      for (const cell of row) {
        cell.shown = true;
      }
    }
  }

  /**
   * Helper to check if a cell can be revealed (i.e., in range, not a mine, and not already shown).
   * @param {number} row
   * @param {number} col
   * @returns {boolean}
   */
  canShow(row, col) {
    return (
      this.isCellIndex(row, col) &&
      !this.board[row][col].isMine &&
      !this.board[row][col].shown
    );
  }

  /**
   * Mark the cell as shown and disable its button.
   * @param {number} row
   * @param {number} col
   */
  takeStep(row, col) {
    this.board[row][col].shown = true;
    this.board[row][col].button.disabled = true;
    this.successCount++;
  }

  /**
   * Reveals safe areas using a flood-fill approach:
   * 1) Reveal the clicked cell.
   * 2) If it has 0 adjacent mines, reveal its neighbors too, recursively.
   * @param {number} row
   * @param {number} col
   */
  showSafeNearby(row, col) {
    // TODO: Implement logic to reveal safe areas.
  }

  /**
   * Toggles a flag on a cell (right click).
   * @param {number} row
   * @param {number} col
   */
  flag(row, col) {
    this.board[row][col].flag();
  }

  /**
   * Game Over logic: reveal everything and display an alert.
   */
  over() {
    this.showAll();
    alert("game over");
  }

  /**
   * Checks if the player has revealed all non-mine cells.
   * @returns {boolean} True if player wins, false otherwise.
   */
  checkWin() {
    return this.successCount === this.width * this.height - this.numMines;
  }

  /**
   * Win logic: reveal everything, stop the game, and display an alert.
   */
  win() {
    this.showAll();
    alert("You win!");
  }

  /**
   * Updates the DOM to reflect the current state of every cell.
   */
  display() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j].display();
      }
    }
  }

  /**
   * Counts the number of flags placed on the board (for UI display).
   * @returns {number}
   */
  countFlags() {
    let counter = 0;
    // TODO: Implement logic to count flagged cells.
    return counter;
  }
}