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
  console.log(1);
  const user = foo3();
  console.log(user);
  app.textContent = `User data: ${JSON.stringify(user)}`;
}

function run(func) {
  const cache = {
    status: "pending",
    value: null,
  };

  const oldFetch = window.fetch;

  window.fetch = function (...args) {
    try {
      if (cache.status === "fulfilled") {
        return cache.value;
      } else if (cache.status === "rejected") {
        throw Promise.reject(cache.value);
      }
      const prom = oldFetch(...args)
        .then((resp) => resp.json())
        .then((res) => {
          cache.status = "fulfilled";
          cache.value = res;
        })
        .catch((err) => {
          cache.status = "rejected";
          cache.value = err;
        });
      throw prom;
    } catch (err) {
      if (err instanceof Promise) {
        err.then(func, func).finally(() => {
          window.fetch = oldFetch;
        });
      }
    }
  };
  func();
}

btn.addEventListener("click", () => {
  run(main);
});
