const textarea = document.querySelector("#msgarea");

// const messagesContainer = document.querySelector(".channel_msg-wrapper");

// const updateMessages = async () => {
//   const url = window.location.href;
//   const channelid = url.split("/")[5];
//   const response = await fetch(
//     `https://discordbackend-ymru.onrender.com/getmessages/${channelid}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();

//   const messages = data.messages;
//   messagesContainer.innerHTML = "";
//   messages.forEach((message) => {
// const msgHTML = `<div class="channel_msg-content">
//   <div class="channel_userInfo">
//     <img
//     src="${message.user.image}"
//       alt="profileimage"
//     />
//     <div class="channel_info">
//       <span class="channel_nameUser">${message.user.username}</span>
//       <span class="channel_timeofmsg">today at ${message.message.createdAt}</span>
//     </div>
//   </div>
//   <div class="channel_actualmsg">
//     <p>
//       ${data.message.message}
//     </p>
//   </div>
// </div>`;
// messagesContainer.insertAdjacentHTML("afterbegin", msgHTML);
// });
// };

// setInterval(updateMessages, 1000);

// const udpateMessages = async (e) => {
//   const url = window.location.href;
//   const channelid = url.split("/")[5];
//   const response = await fetch(
//     `https://discordbackend-ymru.onrender.com/getmessages/${channelid}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   const messages = data.messages;
//   if (!response.ok) {
//     throw new Error(data.message || "Could not get messages");
//   } else {
//     messagesContainer.innerHTML = "";
//     messages.forEach((message) => {
//       const msgHTML = `<div class="channel_msg-content">
//     <div class="channel_userInfo">
//       <img
//       src="${message.sender.image}"
//         alt="profileimage"
//       />
//       <div class="channel_info">
//         <span class="channel_nameUser">${message.sender.username}</span>
//         <span class="channel_timeofmsg">today at ${message.createdAt}</span>
//       </div>
//     </div>
//     <div class="channel_msg">${message.message}</div>
//   </div>`;
//       messagesContainer.insertAdjacentHTML("beforeend", msgHTML);
//     });
//   }
// };
// messagesContainer.addEventListener("input", udpateMessages);
const socket = io(`https://discordbackend-ymru.onrender.com`);

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

socket.on("receiveMessage", (message) => {
  const channelId = window.location.href.split("/")[5];
  const channelIdOfTheMessage = message.channelid;
  // console.log(channelIdOfTheMessage, channelId);
  if (channelIdOfTheMessage === channelId) {
    const messageContainer = document.querySelector(".channel_msg-wrapper");
    const msgHTML = `<div class="channel_msg-content">
    <div class="channel_userInfo">
      <img
      src="${message.user.image}"
        alt="profileimage"
      />
      <div class="channel_info">
        <span class="channel_nameUser">${message.user.username}</span>
        <span class="channel_timeofmsg">today at ${message.createdAt}</span>
      </div>
    </div>
    <div class="channel_actualmsg">
      <p>
        ${message.message}
      </p>
    </div>
  </div>`;
    messageContainer.insertAdjacentHTML("afterbegin", msgHTML);
    messageContainer.scrollTop = 0;
  }
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
      const response = await fetch(
        `https://discordbackend-ymru.onrender.com/createmessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: msg,
            channelid: channelid,
          }),
        }
      );

      const data = await response.json();
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
      socket.emit("newMessage", data.message);
    } catch (err) {
      console.log(err);
    }
  }
});
