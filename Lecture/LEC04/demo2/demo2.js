const fadeText = document.getElementById("fadeText");
const fadeBtn = document.getElementById("fadeBtn");
let opacity = 0;
let fadingIn = true; // true: fading in; false: fading out
let animationId = null;

const START_MSG = "Start Animation";
const STOP_MSG = "Stop Animation";

function fade() {
    // TODO: Implement fade in logic
    if (fadingIn) {
        
    } else {
        // TODO: Implement fade out logic
        
    }
    fadeText.style.opacity = opacity;

    // TODO: Request the next animation frame
    
}

fadeBtn.addEventListener("click", () => {
    if (!animationId) {
        // TODO: Start the animation
        
        fadeBtn.textContent = STOP_MSG;
    } else {
        // TODO: Stop the animation
        
        animationId = null;
        fadeBtn.textContent = START_MSG;
    }
});
