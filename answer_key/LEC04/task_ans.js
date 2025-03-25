const searchBtn = document.getElementById("searchBtn");
const userInfo = document.getElementById("userInfo");

searchBtn.addEventListener("click", async () => {
  const username = document.getElementById("usernameInput").value.trim();
  if (!username) {
    const errorMsg = document.createElement("p");
    errorMsg.style.color = "red";
    errorMsg.textContent = "Please enter a GitHub username first!";
    userInfo.innerHTML = "";
    userInfo.appendChild(errorMsg);
    return;
  }

  // Show loading status
  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = "Searching, please wait...";
  userInfo.innerHTML = "";
  userInfo.appendChild(loadingMsg);

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`Request failed, status code: ${response.status}`);
    }

    const data = await response.json();
    userInfo.innerHTML = "";

    const avatar = document.createElement("img");
    avatar.src = data.avatar_url;
    avatar.width = 100;
    avatar.height = 100;
    avatar.alt = "avatar";
    userInfo.appendChild(avatar);

    const usernameP = document.createElement("p");
    usernameP.textContent = `Username: ${data.login}`;
    userInfo.appendChild(usernameP);

    const bioP = document.createElement("p");
    bioP.textContent = `Bio: ${data.bio ? data.bio : "No bio available"}`;
    userInfo.appendChild(bioP);

    const profileP = document.createElement("p");
    const profileLink = document.createElement("a");
    profileLink.href = data.html_url;
    profileLink.target = "_blank";
    profileLink.textContent = data.html_url;
    profileP.textContent = "GitHub Profile: ";
    profileP.appendChild(profileLink);
    userInfo.appendChild(profileP);
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.style.color = "red";
    errorMsg.textContent = `Search failed: ${error.message}`;
    userInfo.innerHTML = "";
    userInfo.appendChild(errorMsg);
  }
});
