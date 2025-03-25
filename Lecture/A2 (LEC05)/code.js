async function getData() {
  const response = await fetch("./data/test.json");
  return await response.json();
}

async function foo1() {
  const user = await getData();
  return user;
}

async function foo2() {
  const user = await foo1();
  return user;
}

async function foo3() {
  const user = await foo2();
  return user;
}

async function main() {
  app.textContent = "Fetching user data...";
  const user = await foo3();
  app.textContent = `User data: ${JSON.stringify(user)}`;
}

btn.addEventListener("click", () => {
  main();
});
