const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let width = 0;
let timer = null;

// Start animation
startBtn.addEventListener("click", () => {
  if (timer) return; // If it's already moving, don't start again
  timer = setInterval(() => {
    if (width >= 100) {
      clearInterval(timer);
      timer = null;
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }, 30);
});

// Reset animation
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  width = 0;
  progressBar.style.width = "0%";
});