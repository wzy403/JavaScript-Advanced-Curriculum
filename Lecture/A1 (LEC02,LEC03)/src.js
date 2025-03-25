// ---------------------------------------------------
// 1. Global Variables
// ---------------------------------------------------
let cursorPos = 0;
let content = [];
let isFirstTimeRender = true;

// DOM Elements
const terminalContent = document.getElementById("terminalContent");
const commandInput = document.getElementById("commandInput");
const commandBeforeCursorEl = document.getElementById("commandBeforeCursor");
const commandAfterCursorEl = document.getElementById("commandAfterCursor");

// ---------------------------------------------------
// 2. Render Function
// ---------------------------------------------------
function renderContent() {
  /*
   * TODO: 
   * 1. Clear the terminalContent element.
   * 2. Loop through the 'content' array.
   * 3. Create a new <div> for each object in 'content'.
   *    - If it is a user command, prepend a prompt like "➜ ~ "
   *    - If 'needColor' is true, wrap 'colorText' in a <span> with the given class(es).
   *    - Append the normal 'text' after the colored text.
   * 4. Append each <div> to the terminalContent.
   * 5. Scroll terminalContent to the bottom.
   */
}

// ---------------------------------------------------
// 3. Cursor & Command Input Helpers
// ---------------------------------------------------
function focusCommandInput() {
  /*
   * TODO:
   *  - Focus the hidden text input.
   */
}

function updateCursor() {
  /*
   * TODO:
   *  - Update cursorPos (selectionStart).
   *  - Update commandBeforeCursorEl and commandAfterCursorEl to show partial text.
   */
}

// Attach event listeners to handle input changes
commandInput.addEventListener("input", updateCursor);
commandInput.addEventListener("keyup", updateCursor);
commandInput.addEventListener("keypress", function (e) {
  if (!isFirstTimeRender && e.key === "Enter") {
    processCommand();
  }
});

// ---------------------------------------------------
// 4. Utility Functions
// ---------------------------------------------------
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function displayLoadingDots() {
  /*
   * Simple "Loading..." animation
   */
  let loadingText = { text: "Loading", isCommand: false };
  content.push(loadingText);
  renderContent();
  focusCommandInput();

  for (let i = 0; i < 3; i++) {
    await delay(300);
    loadingText.text += ".";
    renderContent();
  }
  await delay(500);

  // Remove "Loading..."
  content.pop();
  renderContent();
}

async function typeLine(line, inputCommand, key) {
  /*
   * TODO:
   *  - Create an object to store text line info (with or without color).
   *  - Append it to content.
   *  - Render it character by character for a typing effect.
   */
}

async function typeContent(inputCommand) {
  /*
   * TODO:
   *  - Look up data from aboutCommand for the given inputCommand.
   *  - For each key in aboutCommand[inputCommand], type out the lines using typeLine function.
   */
}

// ---------------------------------------------------
// 5. Command Data (Sample JSON Simulation)
// ---------------------------------------------------
const aboutCommand = {
  /*
   * TODO: Update with your own data or let students fill these in:
   */
  "intro": {
    "Welcome": ["Welcome to my website!"],
    "System": [
      " Loading personal profile...",
      " Loading successful!",
      " Let me introduce myself."
    ],
    "Name": [" - [Your Name Here]"],
    "School": [" - [Your School Here]"],
    "Program": [" - [Your Program Here]"],
    "Email": [" - [Your Email Here]"],
    "Done": [" -------- Initialization Complete --------"]
  },
  "connect": {
    "Email": [": [Your Email]"],
    "GitHub": [": [Your GitHub Link]"],
    "LinkedIn": [": [Your LinkedIn Link]"]
  },
  "skill": {
    "A": [
      " · Example skill1: 90/100",
      " · Example skill2: 85/100"
    ],
    "B": [
      " · Example skill3: 80/100",
      " · Example skill4: 75/100"
    ],
    "More Skill Stacking": [" · [Any other skill]"]
  },
  "help": {
    "connect": [" => Connect with me"],
    "skill": [" => Shows my skill set"],
    "intro": [" => Introduction of myself"],
    "help": [" => Show this help message"],
    "clear": [" => Clear the screen"]
  },
  "ls": {
    "connect": [" => Connect with me"],
    "skill": [" => Shows my skill set"],
    "intro": [" => Introduction of myself"],
    "help": [" => Show this help message"],
    "clear": [" => Clear the screen"]
  }
};

// ---------------------------------------------------
// 6. The Main Animation (On Page Load)
// ---------------------------------------------------
async function animateContent(commandName) {
  /*
   * TODO:
   *  - Clear the 'content' array.
   *  - Display loading dots (displayLoadingDots).
   *  - Then type out the content for 'commandName' (typeContent).
   *  - Finally, push two lines from System about help and clear commands.
   *  - Set 'isFirstTimeRender' to false.
   *  - Render and focus input.
   */
}

// ---------------------------------------------------
// 7. Command Processing
// ---------------------------------------------------
function processCommand() {
  /*
   * TODO:
   * 1. Get user input from commandInput.value.
   * 2. Clear the commandInput field.
   * 3. Push a new line object to 'content' with isCommand=true, text=user input.
   * 4. Check if the command matches known commands (intro, connect, skill, help, clear, etc.).
   *    - If recognized, call the correct behavior or typeContent.
   *    - Otherwise, call pushErrorToTerminal().
   * 5. Re-render the content.
   * 6. Always refocus the commandInput.
   */
  const inputCommand = commandInput.value.trim().toLowerCase();
  commandInput.value = "";

  // Example: Show what the user typed
  content.push({
    isCommand: true,
    text: inputCommand
  });

  // Check command
  switch (inputCommand) {
    case "help":
      // TODO: Finish the case for "help"
      break;
    case "intro":
      // TODO: Finish the case for "intro"
      break;
    case "connect":
      // TODO: Finish the case for "connect"
      break;
    case "skill":
      // TODO: Finish the case for "skill"
      break;
    case "ls":
      // TODO: Finish the case for "ls"
      break;
    case "clear":
      // TODO: Clear the screen
      break;
    default:
      // If command not recognized
      pushErrorToTerminal(inputCommand);
  }

  renderContent();
  focusCommandInput();
}

// ---------------------------------------------------
// 8. Error Handling
// ---------------------------------------------------
function pushErrorToTerminal(inputCommand) {
  /*
   * Display an error message if the command is not recognized.
   */
  content.push({
    needColor: true,
    class: ["Error", "color-span"],
    colorText: "Error",
    text: ` command not found: ${inputCommand}`
  });
  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "help" for a list of supported commands.'
  });
  renderContent();
}

// ---------------------------------------------------
// 9. Entry Point
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  /*
   * TODO:
   *  - Call the main animation (animateContent("intro")).
   *  - Focus the command input afterwards.
   */
});