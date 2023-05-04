const icon = document.querySelector(".icon-members");
const membersContainer = document.querySelector(".show_users");

icon.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  membersContainer.classList.toggle("hidden");
});
