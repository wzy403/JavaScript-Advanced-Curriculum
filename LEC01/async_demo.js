const testTime = require('./helper_code.js');

// In JavaScript, code execution doesn't always follow the written
// order—this behavior is known as asynchronous programming.

// Run this code in the terminal using the command: 'node async_demo.js'
// And see what will be the output.
// console.log('Start');
// setTimeout(() => {
//   console.log('2 Second Timer');
// }, 2000);
// console.log('End');


// ==================== Callback Functions ==========================

/**
 * Callback Functions: 
 * A callback is a function passed as an argument to another function.
 */

// Example: Callback function
// TODO: Uncomment the below code and run it.
//       And see what will be the output.

// function foo (msg, callback) {
//   callback("Wellcome to: " + msg);
// };
// foo("Big Blue Marble Academy", function (msg) {
//   console.log(msg);
// });


// ==================== Promises ==========================

/**
  Promises:
    A promise is an object that may produce a single value
    some time in the future.
*/

// TODO: Uncomment the below code and run it.
//       And see what will be the output.

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Promise resolved');
//   }, 2000);
// });
// promise.then(value => {
//   console.log(value);
// });
// console.log('This line will print before the promise is resolved.');


// ==================== Async/Await ==========================

/**
  async/await: 
    `async` and `await` make promises easier to write

  - async makes a function return a Promise
  - await makes a function wait for a Promise
*/

// Example: The following is an example of using Async/Await
//          which is functionally equivalent to the Promise-based
//          implementation above.

// TODO: Uncomment the below code and run it.
//       And see what will be the output.

// async function asyncFunction() { 
//   let promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('Promise resolved');
//     }, 2000);
//   });
//   console.log(await promise);
// }
// asyncFunction();
// console.log('This line will print before the asyncFunction is finish.');

// Now you might be wondering, why do we need asynchronous programming?
// Answer: To avoid blocking the execution of code, and make the code run faster.