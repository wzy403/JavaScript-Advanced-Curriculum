## Final Project: JavaScript Minesweeper Game

**Duration:** ~ 12 hours

### Project Overview
In this final project, you will consolidate and apply all the JavaScript skills learned from beginner to advanced levels, including DOM manipulation, asynchronous JavaScript (Promises, async/await), CSS animations, JavaScript animations, and advanced logic handling. Your task is to implement a fully functional Minesweeper game.

---

### Objectives
- Utilize modular JavaScript files to manage project complexity.
- Implement game logic using classes, functions, and DOM interactions.
- Handle asynchronous operations and user interactions effectively.

---

### Project Structure
The project consists of four JavaScript files:

1. `utils.js`
2. `classes.js`
3. `DOM_element.js`
4. `main.js`

---

### Tasks and Recommended Workflow

**Step 1: Complete `utils.js`**
- Implement the `shuffle` function.
  - Ensure the array elements are randomly shuffled each time.

**Step 2: Implement Classes (`classes.js`)**
- Finish the methods marked with `TODO` in the `Cell` and `Minesweeper` classes.
- Understand how each method affects game behavior and UI.

**Step 3: Main Game Logic (`main.js`)**
- Implement the main game setup and logic including:
  - Fetching game configuration asynchronously.
    - Note: The configuration file is name by `config.json`
  - Setting up timers, buttons, and event listeners.
  - Handling left-click (cell reveal) and right-click (flag placement/removal).
  - Updating the game state based on player actions.

---

### DOM Interactions
- All required DOM elements have been preselected in `DOM_element.js`.
- Use provided DOM variables to interact with the game interface:
  - Example: `startBtn`, `mineField`, `timer`, `flagCounter`, etc.

---

### Points to Consider
- Answers and implementations may vary.
- Aim for functional, readable, and maintainable code.
- Ensure proper error handling.

---

### Submission Guidelines
- Implement all function that marked as `TODO`.
- Submit completed `utils.js`, `classes.js`, and `main.js` files.
- Ensure your code includes clear and concise comments.
- Include a brief explanation (README.md) of your implementation approach and challenges faced.

---

### Evaluation Criteria
- Correct implementation of game logic and functionality.
- Effective use of JavaScript concepts (DOM manipulation, classes, asynchronous code).
- User interface responsiveness and accuracy.
- Clean, commented, and maintainable code structure.

Good luck, and enjoy building your Minesweeper game!

