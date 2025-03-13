// 全局变量
let cursorPos = 0;
let content = [];
let isCommandInputDisplay = false;

// 获取DOM元素
const terminalContent = document.getElementById("terminalContent");
const commandInput = document.getElementById("commandInput");
const commandBeforeCursorEl =
  document.getElementById("commandBeforeCursor");
const commandAfterCursorEl =
  document.getElementById("commandAfterCursor");

// 简单渲染函数：遍历content数组将内容写入页面
function renderContent() {
  terminalContent.innerHTML = "";
  content.forEach((line) => {
    const div = document.createElement("div");
    div.className = "terminal-content-text";
    // 如果是用户输入的命令，前面添加提示符
    if (line.isCommand) {
      const prefix = document.createElement("span");
      prefix.textContent = "➜ ~ ";
      div.appendChild(prefix);
    }
    // 如果需要颜色则添加一个span
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
    // 添加文本内容
    const textSpan = document.createElement("span");
    textSpan.textContent = line.text;
    div.appendChild(textSpan);
    terminalContent.appendChild(div);
  });
  // 保持滚动条始终位于底部
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// 聚焦命令输入框
function focusCommandInput() {
  commandInput.focus();
}

// 更新游标位置并显示输入框内容
function updateCursor() {
  cursorPos = commandInput.selectionStart;
  const currentCommand = commandInput.value;
  commandBeforeCursorEl.textContent = currentCommand.slice(0, cursorPos);
  commandAfterCursorEl.textContent = currentCommand.slice(cursorPos);
}

commandInput.addEventListener("input", updateCursor);
commandInput.addEventListener("keyup", updateCursor);
commandInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    processCommand();
  }
});

// 返回一个Promise用于延时
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 显示 Loading... 效果
async function displayLoadingDots() {
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
  content.pop();
  renderContent();
}

// 模拟打字效果，逐字符显示文本
async function typeLine(line, inputCommand, key) {
  let obj = {};
  if (key === "Weclome") {
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
    await delay(10);
  }
  await delay(100);
}

// 根据传入的命令名称显示对应内容
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

// 首次动画效果：加载Loading，再打字显示intro内容，最后显示系统提示
async function animateContent(commandName) {
  content = [];
  renderContent();
  await displayLoadingDots();
  await typeContent(commandName);

  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "help" to get a supporting command list.'
  });
  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "clear" to clear the terminal screen.'
  });
  content.push({
    needColor: true,
    class: ["System", "color-span"],
    colorText: "System",
    text: ' Type "exit" to return to the main page.'
  });
  isCommandInputDisplay = true;
  renderContent();
  focusCommandInput();
}

// 处理用户输入的命令
function processCommand() {
  let inputCommand = commandInput.value.trim().toLowerCase();
  console.log(inputCommand);
  content.push({ isCommand: true, text: inputCommand });
  renderContent();

  if (inputCommand === "clear") {
    content = [];
    commandInput.value = "";
    renderContent();
    focusCommandInput();
    return;
  }
  if (inputCommand === "exit") {
    window.close();
  }

  if (aboutCommand[inputCommand]) {
    for (let key in aboutCommand[inputCommand]) {
      for (let line of aboutCommand[inputCommand][key]) {
        if (key === "Weclome") {
          content.push({ text: line });
          renderContent();
          continue;
        }
        content.push({
          needColor: true,
          class: [inputCommand, key, "color-span"],
          colorText: key,
          text: line
        });
        renderContent();
      }
    }
  } else {
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
      text: ' Type "help" to get a supporting command list.'
    });
    renderContent();
  }

  commandInput.value = "";
  renderContent();
  focusCommandInput();
}

// 模拟从JSON加载的数据
const aboutCommand = {
  "intro": {
    "Weclome": [
      "Welcome to man page terminal!"
    ],
  },
  "help": {
    "help": [
      "help: List available commands",
      "clear: Clear the terminal",
      "exit: Exit the terminal",
    ]
  }
};

// 页面加载完成后启动动画效果
document.addEventListener("DOMContentLoaded", function () {
  animateContent("intro");
  focusCommandInput();
});