## Lesson 6: DOM Animations with JavaScript

**Lesson Duration:** ~ 2 hours

### Lesson Goals:
- Understand the principles behind DOM animations.
- Explore how JavaScript complements CSS for interactive animations.
- Implement animations using `requestAnimationFrame` and basic event handling.

---

### 1. Introduction to DOM Animations (10 min.)
- Explanation:
  - How animations enhance user experience.
  - CSS vs. JavaScript animations: strengths and ideal use-cases.

---

### 2. Demo 1: Moving Box Animation (10 min. [student] + 10 min. [take up])
- Objective:
  - Implement basic animation using `requestAnimationFrame`.
  - Move a box horizontally across the screen.
- Task:
  ```javascript
  function moveBox() {
      // Move 2 pixels per frame
      // Reverse direction at boundaries
      // Use requestAnimationFrame
  }
  ```

---

### 3. Demo 2: Fade In & Fade Out Animation (10 min. [student] + 10 min. [take up])
- Objective:
  - Control opacity to create smooth fade effects.
  - Handle start/stop of animations using button events.
- Task:
  ```javascript
  function fade() {
      // Gradually adjust opacity to fade text
      // Implement toggle between fading in and fading out
      // Handle button click to start/stop animation
  }
  ```

---

### 4. Demo 3: Progress Bar Animation (10 min. [student] + 10 min. [take up])
- Objective:
  - Animate a progress bar filling up.
  - Control animation start/reset via button events.
- Task:
  ```javascript
  startBtn.addEventListener("click", () => {
    // Animate progress bar filling up
  });

  resetBtn.addEventListener("click", () => {
    // Reset progress bar animation
  });
  ```

---

### 5. Interactive Task: Animated Bouncing Ball (30 min. [student] + 15 min. [take up])
- Objective:
  - Combine previous animation skills into an interactive task:
  - Animate a ball that responds to gravity, bouncing, and user key events (arrows).
- Key implementation points:
  ```javascript
  function handleKeyDown(e) {
    // Respond to arrow keys for direction and speed
  }

  function updatePosition() {
    // Calculate physics of movement and bouncing
  }

  function animate() {
    // Continuously animate ball with requestAnimationFrame
  }
  ```

---

### 6. Recap & Discussion (5 min.)
- Review animation techniques and best practices.