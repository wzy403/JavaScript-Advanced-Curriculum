// ==================== Task 1 ==========================
/**
 * The following code run really slow because of the sleep function.
 * You job is to make the code run within 5 seconds.
 *
 * Both Oven preheat and pie makeing time is 5 seconds.
 * To earn full credit, you must follow the following rules:
 *  - You cannot change the waiting time to make the code run faster.
 *  - You cannot change the function signature.
 *  + You can change the implementation of the existing functions.
 *  + You can add new functions/variables if needed.
 * Hint: Promise await/async might help you to solve this problem.
 *
 * Note: After you finish the task, take a look at the code in helper_code.js
 *       to see how the testTime function works. So you can test your code.
 */
function sleep(ms) {
  let start = Date.now();
  while (Date.now() - start < ms) {}
}

function preheatOven() {
  console.log("Oven is preheating...");
  sleep(5000);
  console.log("Oven preheat complete!");
}

function makePie() {
  console.log("Start making the pie...");
  sleep(5000);
  console.log("Pie is ready!");
}

async function run() {
  console.log("Starting tasks...");
  preheatOven();
  makePie();
  console.log("All tasks done!");
}

// testTime(run); // TODO: Uncomment this line to test your code
