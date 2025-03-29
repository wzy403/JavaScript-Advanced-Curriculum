import shuffle from "./utils.js";
import { mineField } from "./DOM_element.js";

class Cell {
  constructor() {
    this.isMine = false;
    this.adjacentMines = 0;
    this.shown = false;
    this.flagged = false;
    this.button = null;
  }

  flag() {
    this.flagged = !this.flagged;
  }

  display() {
    if (this.shown) {
      if (this.isMine) {
        this.button.type = "mine";
      } else {
        this.button.type = this.adjacentMines + "mine";
      }
    } else {
      this.button.type = this.flagged ? "flag" : "0mine";
    }
  }
}

export class Minesweeper {
  constructor(width, height, numMines) {
    this.width = width;
    this.height = height;
    this.numMines = numMines;
    this.board = null;
    this.successCount = 0;
    this.init();
  }

  init() {
    this.createBoard();
    this.placeMines();
    this.countAllAdjacentMines();
    this.display();
  }

  createBoard() {
    mineField.innerHTML = "";
    // insert col number
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

      // insert row number
      const rowNum = document.createElement("th");
      rowNum.textContent = String(i);
      row.appendChild(rowNum);

      this.board.push([]);
      for (let j = 0; j < this.width; j++) {
        const td = document.createElement("td");
        const button = document.createElement("button");
        button.setAttribute("class", "cell");
        button.setAttribute("type", "mine0");
        button["row"] = i;
        button["col"] = j;
        td.appendChild(button);
        row.appendChild(td);

        let cell = new Cell();
        cell.button = button;
        this.board[i].push(cell);
      }
      mineField.appendChild(row);
    }
  }

  placeMines() {
    let mineIndices = [];
    for (let i = 0; i < this.width * this.height; i++) {
      mineIndices[i] = i;
    }
    shuffle(mineIndices);
    for (let i = 0; i < this.numMines; i++) {
      let row = Math.floor(mineIndices[i] / this.width);
      let col = mineIndices[i] % this.width;
      this.board[row][col].isMine = true;
    }
  }

  countAllAdjacentMines() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j].adjacentMines = this.countAdjacentMines(i, j);
      }
    }
  }

  isCellIndex(row, col) {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  isMine(row, col) {
    return this.isCellIndex(row, col) && this.board[row][col].isMine;
  }

  countAdjacentMines(row, col) {
    let counter = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.isMine(row + i, col + j)) counter++;
      }
    }
    return counter;
  }

  choose(row, col) {
    if (this.board[row][col].flagged) return;

    // ensure first click is not a mine
    if (this.successCount === 0) {
      while (
        this.board[row][col].isMine ||
        this.board[row][col].adjacentMines > 0
      ) {
        this.init();
      }
    }
    if (this.board[row][col].isMine) {
      return -1;
    }
    this.showSafeNearby(row, col);
    if (this.checkWin()) {
      return 1;
    }
    return 0;
  }

  showAll() {
    for (const row of this.board) {
      for (const cell of row) {
        cell.shown = true;
      }
    }
  }

  canShow(row, col) {
    return (
      this.isCellIndex(row, col) &&
      !this.board[row][col].isMine &&
      !this.board[row][col].shown
    );
  }

  takeStep(row, col) {
    this.board[row][col].shown = true;
    this.board[row][col].button.disabled = true;
    this.successCount++;
  }

  showSafeNearby(row, col) {
    this.takeStep(row, col);
    if (this.board[row][col].adjacentMines !== 0) return;

    const searchList = [];
    searchList.push([row, col]);

    while (searchList.length > 0) {
      const coordinate = searchList.shift();
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let r = coordinate[0] + i;
          let c = coordinate[1] + j;
          if (this.canShow(r, c)) {
            this.takeStep(r, c);
            if (this.board[r][c].adjacentMines === 0) {
              searchList.push([r, c]);
            }
          }
        }
      }
    }
  }

  flag(row, col) {
    this.board[row][col].flag();
  }

  over() {
    this.showAll();
    alert("game over");
  }

  checkWin() {
    return this.successCount === this.width * this.height - this.numMines;
  }

  win() {
    this.showAll();
    alert("You win!");
  }

  display() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j].display();
      }
    }
  }

  countFlags() {
    let counter = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j].flagged) {
          counter++;
        }
      }
    }
    return counter;
  }
}
