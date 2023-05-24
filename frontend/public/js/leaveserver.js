const leaveServerBtn = document.querySelector(".leaveserver");
const SERVERURL = "https://discordbackend.onrender.com";

leaveServerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const serverid = window.location.href.split("/")[4];
  console.log(serverid);
  const response = await fetch(`${SERVERURL}/${serverid}/leaveserver`, {
    method: "DELETE",
  });
  window.location.href = "/me/";
});
