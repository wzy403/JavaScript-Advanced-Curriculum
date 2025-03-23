const fadeText = document.getElementById("fadeText");
const fadeBtn = document.getElementById("fadeBtn");
let opacity = 0;
let fadingIn = true; // true: fading in; false: fading out
let animationId = null;

const START_MSG = "Start Animation";
const STOP_MSG = "Stop Animation";

function fade() {
  if (fadingIn) {
    opacity += 0.01;
    if (opacity >= 1) {
      opacity = 1;
      fadingIn = false; // After fully visible, start fading out
    }
  } else {
    opacity -= 0.01;
    if (opacity <= 0) {
      opacity = 0;
      fadingIn = true; // After fully hidden, start fading in
    }
  }
  fadeText.style.opacity = opacity;

  animationId = requestAnimationFrame(fade);
}

fadeBtn.addEventListener("click", () => {
  if (!animationId) {
    fade();
    fadeBtn.textContent = STOP_MSG;
  } else {
    // If animation is in progress, stop the animation on button click
    cancelAnimationFrame(animationId);
    animationId = null;
    fadeBtn.textContent = START_MSG;
  }
});
