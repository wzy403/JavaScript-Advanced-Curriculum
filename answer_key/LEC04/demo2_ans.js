const output = document.getElementById("output");

document.getElementById("btn").addEventListener("click", async function () {
  try {
    const response = await fetch(`https://api.github.com/users/octocat`);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const data = await response.json();
    output.innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Request failed:", error);
  }
});
