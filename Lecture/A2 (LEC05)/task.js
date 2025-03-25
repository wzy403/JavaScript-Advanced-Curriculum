// In the previous lecture, you experimented with the fetch function and explored
// how async/await and Promises work.
// In this assignment, you will gain a deeper understanding of how fetch works
// by rewriting a new fetch function yourself.
// During this assignment, you will also improve your understanding of how async/await
// and Promises work, and how they are related to each other.

// TODO: Before you start, take a look at the code in code.js
//       and understand how the code works.

// This task requires you to implement functionality in code.js without using async/await.
// You can only use Promises and then/catch to implement the code.
// Note: You cannot start the code.

function getData() {
  return fetch("./data/test.json");
}

function foo1() {
  const user = getData();
  return user;
}

function foo2() {
  const user = foo1();
  return user;
}

function foo3() {
  const user = foo2();
  return user;
}

function main() {
  app.textContent = "Fetching user data...";
  const user = foo3();
  app.textContent = `User data: ${JSON.stringify(user)}`;
}

// TODO: Implement the run function using Promises and then/catch.
//       You cannot use async/await in this function.
//       Make sure to handle the fetch call and caching logic as described.
// After you finish, Uncomment the line 14 in replace_await.html to test your code.
function run(func) {
}

btn.addEventListener("click", () => {
  run(main);
});
