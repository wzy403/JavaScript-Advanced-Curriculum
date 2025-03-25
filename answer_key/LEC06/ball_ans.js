const ball = document.getElementById("ball");

// Ball position, speed, and other variables
let x = 100; // Horizontal position
let y = 100; // Vertical position
let vx = 2; // Horizontal speed
let vy = 2; // Vertical speed
let gravity = 0.2; // Simulate gravity for bouncing effect
let bounce = 0.8; // Bounce coefficient, determines speed reduction after each bounce
const ballSize = 50; // Diameter of the ball
let ground = window.innerHeight - ballSize; // Ground position

// Initialize event listeners
function initEventListeners() {
  document.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", updateGroundPosition);
}

// Handle keyboard events
function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowLeft":
      vx = Math.max(vx - 1, -10); // Limit maximum speed
      break;
    case "ArrowRight":
      vx = Math.min(vx + 1, 10);
      break;
    case "ArrowUp":
      vy -= 2; // Increase upward speed
      break;
    case "ArrowDown":
      if (Math.abs(y - ground) < 5) {
        vy = -10;
      }
      break;
  }
}

// Update ground position when window size changes
function updateGroundPosition() {
  ground = window.innerHeight - ballSize;
}

// Update ball position and handle bouncing
function updatePosition() {
  x += vx;
  y += vy;
  vy += gravity;

  if (x <= 0) {
    x = 0;
    vx = -vx * bounce;
  } else if (x >= window.innerWidth - ballSize) {
    x = window.innerWidth - ballSize;
    vx = -vx * bounce;
  }

  if (y >= ground) {
    y = ground;
    vy = -vy * bounce;
  } else if (y <= 0) {
    y = 0;
    vy = -vy * bounce;
  }
}

// Update ball DOM position
function updateBallPosition() {
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}

// Animation loop
function animate() {
  updatePosition();
  updateBallPosition();
  requestAnimationFrame(animate);
}

// Initialize the application
function init() {
  initEventListeners();
  animate();
}

// Start the application
init();
