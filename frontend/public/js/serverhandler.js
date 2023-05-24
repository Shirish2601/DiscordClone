const dropdownButton = document.querySelector(".down_icon");

dropdownButton.addEventListener("click", () => {
  const dropdownMenu = document.querySelector(".dropdown-server");
  dropdownMenu.classList.toggle("hidden");
});
