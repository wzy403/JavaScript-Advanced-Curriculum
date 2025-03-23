const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let width = 0;
let timer = null;

startBtn.addEventListener("click", () => {
  if (timer) return; // If it's already moving, don't start again
  
  // TODO: Set an interval to update the progress bar width
});

resetBtn.addEventListener("click", () => {
  // TODO: Clear the interval and reset the width
  // TODO: Reset the progress bar width style
});
