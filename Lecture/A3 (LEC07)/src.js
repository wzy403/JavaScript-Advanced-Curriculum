/**
 * During lecture 4, you learned the basics of how JavaScript interacts with CSS in the DOM
 * to create animations.
 * 
 * In this assignment, you will create a simple scroll animation using JavaScript and CSS.
 * 
 * By the end of this assignment, you will also learn a very important and powerful concept 
 * in JS animation called the animation timing function, which is used to create smooth
 * animations.
 */

// Select DOM elements
const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list = document.querySelector('.list');

// Create animation function
function createAnimation(xStart, xEnd, yStart, yEnd) {
  // TODO: Implement the animation function logic
  return function (x) {
    // TODO: Add conditions and return the appropriate value
  };
}

// Initialize animation map
const animationMap = new Map();

// Update animation map
function updateAnimationMap() {
  animationMap.clear();
  if (items.length === 0) return;

  const playGroundRect = playGround.getBoundingClientRect();
  const scrollY = window.scrollY;
  const playGroundTop = playGroundRect.top + scrollY;
  const playGroundBottom = playGroundRect.bottom + scrollY - window.innerHeight;
  const listRect = list.getBoundingClientRect();

  items.forEach((item, i) => {
    const scrollStart = calculateScrollStart(playGroundTop, item);
    const scrollEnd = playGroundBottom;
    const itemDimensions = getItemDimensions(item);
    const listCenter = getListCenter(listRect);

    const animations = createAnimations(scrollStart, scrollEnd, itemDimensions, listCenter);

    animationMap.set(item, animations);
  });
}

function calculateScrollStart(playGroundTop, item) {
  // TODO: Calculate and return the scroll start position
}

function getItemDimensions(item) {
  // TODO: Return the dimensions and position of the item
}

function getListCenter(listRect) {
  // TODO: Return the center position of the list
}

function createAnimations(scrollStart, scrollEnd, itemDimensions, listCenter) {
  // TODO: Create and return the animations for opacity, scale, translateX, and translateY
}

// Update styles based on scroll position
function updateStyles() {
  const scrollY = window.scrollY;
  animationMap.forEach((animations, item) => {
    Object.keys(animations).forEach((prop) => {
      item.style[prop] = animations[prop](scrollY);
    });
  });
}

// Initialize animations and styles
function init() {
  updateAnimationMap();
  updateStyles();
}

// Event listeners
window.addEventListener('scroll', updateStyles);
window.addEventListener('resize', () => {
  updateAnimationMap();
  updateStyles();
});

// Initialize on load
init();
