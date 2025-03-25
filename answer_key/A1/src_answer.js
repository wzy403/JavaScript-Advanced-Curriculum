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
  terminalContent.innerHTML = "";

  content.forEach((line) => {
    const div = document.createElement("div");
    div.className = "terminal-content-text";

    // If it is a user input command, add a prompt
    if (line.isCommand) {
      const prefix = document.createElement("span");
      prefix.textContent = "➜ ~ ";
      div.appendChild(prefix);
    }

    // If color is needed, add a span
    if (line.needColor) {
      const colorSpan = document.createElement("span");
      if (Array.isArray(line.class)) {
        colorSpan.className = line.class.join(" ");
      } else {
        colorSpan.className = line.class;
      }
      colorSpan.textContent = line.colorText;
      div.appendChild(colorSpan);
    }

    // Add the normal text
    const textSpan = document.createElement("span");
    textSpan.textContent = line.text;
    div.appendChild(textSpan);

    terminalContent.appendChild(div);
  });

  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// ---------------------------------------------------
// 3. Cursor & Command Input Helpers
// ---------------------------------------------------
function focusCommandInput() {
  commandInput.focus();
}

function updateCursor() {
  cursorPos = commandInput.selectionStart;
  const currentCommand = commandInput.value;
  commandBeforeCursorEl.textContent = currentCommand.slice(0, cursorPos);
  commandAfterCursorEl.textContent = currentCommand.slice(cursorPos);
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
  let obj = {};
  if (key === "Welcome") {
    obj = { text: "" };
  } else {
    obj = {
      needColor: true,
      class: [inputCommand, key, "color-span"],
      colorText: key,
      text: ""
    };
  }

  content.push(obj);
  renderContent();

  let currentText = "";
  for (let char of line) {
    currentText += char;
    obj.text = currentText;
    renderContent();
    if (isFirstTimeRender) {
      await delay(10);
    }
  }
  if (isFirstTimeRender) {
    await delay(100);
  }
}

async function typeContent(inputCommand) {
  if (aboutCommand[inputCommand]) {
    for (let key in aboutCommand[inputCommand]) {
      for (let line of aboutCommand[inputCommand][key]) {
        await typeLine(line, inputCommand, key);
      }
    }
  }
  renderContent();
}

// ---------------------------------------------------
// 5. Command Data (Sample JSON Simulation)
// ---------------------------------------------------
const aboutCommand = {
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
  content = [];
  renderContent();

  await displayLoadingDots();
  await typeContent(commandName);

  
  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "help" for a list of supported commands.'
  });
  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "clear" to clear the screen.'
  });
  
  isFirstTimeRender = false;
  renderContent();
  focusCommandInput();
}

// ---------------------------------------------------
// 7. Command Processing
// ---------------------------------------------------
function processCommand() {
  const inputCommand = commandInput.value.trim().toLowerCase();
  commandInput.value = "";

  // Show what the user typed
  content.push({
    isCommand: true,
    text: inputCommand
  });

  // Check command
  switch (inputCommand) {
    case "help":
      typeContent("help");
      break;
    case "intro":
      typeContent("intro");
      break;
    case "connect":
      typeContent("connect");
      break;
    case "skill":
      typeContent("skill");
      break;
    case "ls":
      typeContent("ls");
      break;
    case "clear":
      // Clear the screen
      content = [];
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
  animateContent("intro");
  focusCommandInput();
});