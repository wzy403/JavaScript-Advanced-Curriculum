const output = document.getElementById("output");

document.getElementById("btn").addEventListener("click", function () {
  fetch("https://api.github.com/users/octocat")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      output.innerText = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
});
