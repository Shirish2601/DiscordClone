const leaveServerBtn = document.querySelector(".leaveserver");

leaveServerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const serverid = window.location.href.split("/")[4];
  console.log(serverid);
  const response = await fetch(
    `https://discordbackend-ymru.onrender.com/${serverid}/leaveserver`,
    {
      method: "DELETE",
    }
  );
  window.location.href = "/me/";
});
