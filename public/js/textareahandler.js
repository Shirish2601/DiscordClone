const textarea = document.querySelector("#msgarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

textarea.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const msg = textarea.value;
    if (msg === "") return;

    const url = window.location.href;
    const channelid = url.split("/")[5];
    try {
      const response = await fetch("http://localhost:5500/createmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
          channelid: channelid,
        }),
      });

      const data = await response.json();
      console.log(data);
      const messageContainer = document.querySelector(".channel_msg-wrapper");
      const msgHTML = `<div class="channel_msg-content">
    <div class="channel_userInfo">
      <img
      src="${data.user.image}"
        alt="profileimage"
      />
      <div class="channel_info">
        <span class="channel_nameUser">${data.user.username}</span>
        <span class="channel_timeofmsg">today at ${data.message.createdAt}</span>
      </div>
    </div>
    <div class="channel_actualmsg">
      <p>
        ${data.message.message}
      </p>
    </div>
  </div>`;
      messageContainer.insertAdjacentHTML("afterbegin", msgHTML);
      textarea.value = "";
      messageContainer.scrollTop = 0;
    } catch (err) {
      console.log(err);
    }
  }
});
