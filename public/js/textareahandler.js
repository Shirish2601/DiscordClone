const textarea = document.querySelector("#msgarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

textarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const msg = textarea.value;
    if (msg === "") return;
    const messageContainer = document.querySelector(".channel_msg-wrapper");
    const msgHTML = `<div class="channel_msg-content">
    <div class="channel_userInfo">
      <img
      src="<%= user.image %>"
        alt="profileimage"
      />
      <div class="channel_info">
        <span class="channel_nameUser"><%= user.username %></span>
        <span class="channel_timeofmsg">today at ${new Date().getHours()}:${new Date().getMinutes()}</span>
      </div>
    </div>
    <div class="channel_actualmsg">
      <p>
        ${msg}
      </p>
    </div>
  </div>`;
    messageContainer.insertAdjacentHTML("afterbegin", msgHTML);
    textarea.value = "";
    messageContainer.scrollTop = 0;
  }
});
