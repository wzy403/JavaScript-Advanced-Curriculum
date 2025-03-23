/**
 * Measures and logs the execution time of a given async function.
 *
 * @param {Function} asyncFunction - The async function to be measured. 
 * @returns {Promise<void>} A promise that resolves when the function execution completes.
 */
async function testTime(mainFunction){
  let start = Date.now();
  await mainFunction();
  let end = Date.now();
  console.log("Time taken: ", Math.round((end - start) / 1000), " seconds");
}

module.exports = testTime; // Do not remove this line.
  