const logoutBtn = document.querySelector(".logout");
const settingsBtn = document.querySelector(".settings_icon");

settingsBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const userDropDown = document.querySelector(".user_dropdown");
  userDropDown.classList.toggle("hidden");
});

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const response = await fetch("http://localhost:5500/logout/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  window.location.href = "/login/";
});
