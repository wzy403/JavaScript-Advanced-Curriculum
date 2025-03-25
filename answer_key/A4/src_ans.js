// Select DOM elements
const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list = document.querySelector('.list');

// Create animation function
function createAnimation(xStart, xEnd, yStart, yEnd) {
  return function (x) {
    if (x <= xStart) return yStart;
    if (x >= xEnd) return yEnd;
    return yStart + ((x - xStart) / (xEnd - xStart)) * (yEnd - yStart);
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
  return playGroundTop + item.dataset.order * 600;
}

function getItemDimensions(item) {
  return {
    width: item.clientWidth,
    height: item.clientHeight,
    left: item.offsetLeft,
    top: item.offsetTop,
  };
}

function getListCenter(listRect) {
  return {
    x: listRect.width / 2,
    y: listRect.height / 2,
  };
}

function createAnimations(scrollStart, scrollEnd, itemDimensions, listCenter) {
  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  const translateXAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    listCenter.x - itemDimensions.left - itemDimensions.width / 2,
    0
  );
  const translateYAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    listCenter.y - itemDimensions.top - itemDimensions.height / 2,
    0
  );

  return {
    opacity: (scrollY) => opacityAnimation(scrollY),
    transform: (scrollY) => {
      const scaled = scaleAnimation(scrollY);
      const x = translateXAnimation(scrollY);
      const y = translateYAnimation(scrollY);
      return `translate(${x}px, ${y}px) scale(${scaled})`;
    },
  };
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
