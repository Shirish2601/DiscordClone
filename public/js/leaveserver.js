const leaveServerBtn = document.querySelector(".leaveserver");

leaveServerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const serverid = window.location.href.split("/")[4];
  const response = await fetch(
    `http://localhost:5500/${serverid}/leaveserver`,
    {
      method: "DELETE",
    }
  );
  window.location.href = "/me/";
});
