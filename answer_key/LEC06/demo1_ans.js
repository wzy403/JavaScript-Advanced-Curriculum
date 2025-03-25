const box = document.getElementById("box");
let position = 0; // Record position
let direction = 1; // 1 means moving right, -1 means moving left
const maxPosition = 300; // Maximum range for the box to move

function moveBox() {
  position += direction * 2; // Move 2 pixels each time
  box.style.left = position + "px";

  // Reverse direction when the box moves to the far right or far left
  if (position >= maxPosition || position <= 0) {
    direction *= -1;
  }

  // Use requestAnimationFrame for smooth animation
  requestAnimationFrame(moveBox);
}

// Start animation
moveBox();

