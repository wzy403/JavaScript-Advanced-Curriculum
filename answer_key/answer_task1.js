const { testTime } = require('./testTime');

// Answer key:
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function preheatOven() {
  console.log("Oven is preheating...");
  await sleep(5000);
  console.log("Oven preheat complete!");
}

async function makePie() {
  console.log("Start making the pie...");
  await sleep(5000);
  console.log("Pie is ready!");
}

async function run(){
  console.log("Starting tasks...");
  await Promise.all([preheatOven(), makePie()]);
  console.log("All tasks done!");
}

testTime(run); // Logs execution time