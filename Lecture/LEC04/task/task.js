/**
 * Event listener for the search button click event.
 * 
 * - Retrieves the username from the input field.
 * - If the username is empty, displays an error message.
 * - Shows a loading status while fetching data.
 * - Sends a GET request to the GitHub API to fetch user information.
 * - Displays the user's avatar, username, bio, and GitHub profile link on the page.
 * - If the request fails or the user is not found, displays an error message.
 * 
 */
const searchBtn = document.getElementById("searchBtn");
const userInfo = document.getElementById("userInfo");

searchBtn.addEventListener("click", async () => {
  const username = document.getElementById("usernameInput").value.trim();
  if (!username) {
    // TODO: Create an error message element and append it to userInfo
    return;
  }

  // TODO: Show loading status

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`Request failed, status code: ${response.status}`);
    }

    const data = await response.json();
    userInfo.innerHTML = "";

    // TODO: Create an image element for the avatar and append it to userInfo

    // TODO: Create a paragraph element for the username and append it to userInfo

    // TODO: Create a paragraph element for the bio and append it to userInfo

    // TODO: Create a paragraph element for the GitHub profile link and append it to userInfo

  } catch (error) {
    // TODO: Create an error message element and append it to userInfo
  }
});
