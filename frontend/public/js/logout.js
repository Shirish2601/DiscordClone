const logoutBtn = document.querySelector(".logout");
const settingsBtn = document.querySelector(".settings_icon");

settingsBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  console.log("clicked");
  const userDropDown = document.querySelector(".user_dropdown");
  userDropDown.classList.toggle("hidden");
});

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const response = await fetch(
    `https://discordbackend-ymru.onrender.com/logout/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  window.location.href = "/login/";
});
