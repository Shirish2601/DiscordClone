// $(function () {
//   $(".add-icon-btn").on("click", function () {
//     $(".popup").load("popup.html");
//     $("body").append("<div class='popup'></div>");
//     $(".discord-container").css("opacity", "0.5");
//     $(".popup").css("opacity", "1");

//     $(".create-server__button").on("click", function () {
//       var serverName = $(".upload-server__name input").val();
//       console.log(serverName);
//     });
//   });
// });
const SERVERURL = process.env.SERVERURL;

const addServerButton = document.querySelector(".add-icon-btn");
const servers = document.querySelectorAll(".btn-server-image");
const discordContainer = document.querySelector(".discord-container");

let serverLogo = "";
let serverCreated = false;

const popupRemover = (discordContainer, popup) => {
  discordContainer.style.cssText = "opacity: 1";
  if (popup) popup.remove();
  const cssLinkTag = document.querySelector(
    `link[href="${SERVERURL}/getpopup.css"]`
  );
  if (cssLinkTag) cssLinkTag.remove();
};

const linkChecker = (link) => {
  if (document.querySelector(`${link}`)) return true;
  return false;
};

// add channels
// const addChannelIcon = document.querySelector(".add_icon");
// addChannelIcon.addEventListener("click", async (e) => {
//   e.preventDefault();
//   e.stopImmediatePropagation();

//   const popup = document.body.appendChild(document.createElement("div"));
//   document.body.insertBefore(popup, document.body.firstChild);

//   popup.classList.add("popup");
//   try {
//     const response = await fetch(
//       "${SERVERURL}getpopupcreatechannel",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "text/html",
//         },
//       }
//     );

//     const data = await response.text();
//     popup.innerHTML = data;

//     discordContainer.style.cssText = "opacity: 0.5";

//     discordContainer.addEventListener("click", () => {
//       popupRemover(discordContainer, popup);
//     });

//     const backBtn = document.querySelector(".create-server__button.back");
//     backBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//       popupRemover(discordContainer, popup);
//     });

//     const createChannelBtn = document.querySelector(".create_channel");
//     createChannelBtn.addEventListener("click", async (e) => {
//       console.log("clicked");
//       e.preventDefault();
//       e.stopImmediatePropagation();

//       const inputChannel = document.querySelector(".input-server__name");
//       const channelName = inputChannel.value;
//       const html = `<div tabindex="-1" id="scripted" class="channel">
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     class="icon-2W8DHg"
//     aria-hidden="true"
//     role="img"
//   >
//     <path
//       fill="currentColor"
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
//     ></path>
//   </svg>
//   ${channelName}
// </div>`;
//       popupRemover(discordContainer, popup);
//       const channelContainer = document.querySelector(".category");
//       channelContainer.insertAdjacentHTML("beforeend", html);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

addServerButton.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  if (document.querySelector(".popup")) {
    popupRemover(discordContainer, document.querySelector(".popup"));
  }

  const popup = document.body.appendChild(document.createElement("div"));
  document.body.insertBefore(popup, document.body.firstChild);

  popup.classList.add("popup");
  try {
    const response = await fetch(`${SERVERURL}/getpopup`, {
      method: "GET",
      headers: {
        "Content-Type": "text/html",
      },
    });

    const data = await response.text();
    popup.innerHTML = data;

    discordContainer.style.cssText = "opacity: 0.5";

    // discordContainer.addEventListener("click", () => {
    //   popupRemover(discordContainer, popup);
    // });

    //
    const askJoinButton = document.querySelector(".ask-join");
    const askCreateButton = document.querySelector(".ask-create");
    const askUserPopup = document.querySelector(".ask-user");
    const createServerPopup = document.querySelector(".create-server__popup");
    const joinServerPopup = document.querySelector(".join-server__popup");

    const hidePopups = () => {
      askUserPopup.classList.add("hidden");
      createServerPopup.classList.add("hidden");
      joinServerPopup.classList.add("hidden");
    };

    // new
    askJoinButton.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      hidePopups();
      joinServerPopup.classList.remove("hidden");
      const inviteBackButton = document.querySelector(".invite-back");
      inviteBackButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        popupRemover(discordContainer, popup);
      });

      const joinServerButton = document.querySelector(".invite-join");

      joinServerButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const joincode = document.querySelector(".invite-code__input").value;
        const response = await fetch(`${SERVERURL}/joinserver`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ joincode }),
        });
        const data = await response.json();
        if (!response.ok) {
          alert("Invalid code");
        } else {
          const serverHTML = `
          <a href="/me/${data.server._id}" class="btn-server-image">
            <img class="server" style="margin-top: 7px" src="${data.server.image} " alt="server">
          </a>`;
          const serverContainer = document.querySelector(".sidebar-servers");
          serverContainer.insertAdjacentHTML("afterbegin", serverHTML);
          window.location.href = `/me/${data.server._id}`;
        }
      });
    });

    askCreateButton.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      console.log("create");

      hidePopups();
      createServerPopup.classList.remove("hidden");

      const backBtn = document.querySelector(".create-server__button.back");
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        popupRemover(discordContainer, popup);
      });

      const createBtn = document.querySelector(".create-server__button.create");
      createBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const serverName = document.querySelector(
          ".upload-server__name input"
        ).value;

        const serverImageUrl =
          document.querySelector(".input-server__url").value;

        if (serverName === "") {
          alert("Please enter a server name");
          return;
        }

        if (serverImageUrl === "") {
          alert("Please enter a server logo");
          return;
        }

        if (serverImageUrl && serverName) {
          const responseServer = await fetch(`${SERVERURL}/me`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              servername: serverName,
              image: serverImageUrl,
            }),
          });

          const data = await responseServer.json();

          const parentElement = document.querySelector(".sidebar-servers");

          const serverHTML = `
          <a href="/me/${data.server._id}" class="btn-server-image">
            <img class="server" style="margin-top: 7px" src="${data.server.image} " alt="server">
          </a>`;

          parentElement.insertAdjacentHTML("afterbegin", serverHTML);

          if (!responseServer.ok) {
            throw new Error("Server creation failed!");
          } else {
            serverCreated = true;
          }
          // remove the popup
          popupRemover(discordContainer, popup);
        }
      });
      // popupRemover(discordContainer, popup);
    });
  } catch (err) {
    console.log(err);
  }
});

// const getChannels = async () => {
//   const linkAlreadyExists = document.querySelector(
//     "link[href='${SERVERURL}channels/']"
//   );
//   if (linkAlreadyExists) linkAlreadyExists.remove();

//   const response = await fetch("${SERVERURL}channels/2/1", {
//     method: "GET",
//     headers: {
//       "Content-Type": "text/html",
//     },
//   });
//   discordContainer.insertAdjacentHTML("beforeend", await response.text());

//   const link = `<link rel="stylesheet" href="${SERVERURL}channels/">`;
//   document.head.insertAdjacentHTML("beforeend", link);
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const parentElement = document.querySelector(".sidebar-servers");
//   parentElement.addEventListener("click", (e) => {
//     if (e.currentTarget.firstChild.classList[0] === "btn-server-image") {
//       e.preventDefault();
//       e.stopImmediatePropagation();

//       const serverImages = document.querySelectorAll(".btn-server-image");
//       console.log(serverImages);
//       serverImages.forEach((serverImage) => {
//         serverImage.classList.remove("active");
//       });
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.body.addEventListener("click", async (e) => {
//     const btnServerImage = e.target.closest(".btn-server-image");
//     if (btnServerImage) {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//       const response = await fetch("${SERVERURL}gettextarea", {
//         method: "GET",
//         headers: {
//           "Content-Type": "text/html",
//         },
//       });
//       const data = await response.text();
//       const link = `<link rel="stylesheet" href="${SERVERURL}gettextarea.css">`;
//       if (linkChecker("link[href='${SERVERURL}gettextarea.css']"))
//         link.remove();

//       document.head.insertAdjacentHTML("beforeend", link);
//       discordContainer.insertAdjacentHTML("beforeend", data);

//       const serverImages = document.querySelectorAll(".btn-server-image");
//       serverImages.forEach((serverImage) => {
//         serverImage.classList.remove("active");
//       });

//       btnServerImage.classList.add("active");
//     }
//   });
// });

// const textarea = document.querySelector("#msgarea");

// textarea.addEventListener("input", () => {
//   textarea.style.height = "auto";
//   textarea.style.height = `${textarea.scrollHeight}px`;
// });

// textarea.addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     const msg = textarea.value;
//     if (msg === "") return;
//     const messageContainer = document.querySelector(".channel_msg-wrapper");
//     const msgHTML = `<div class="channel_msg-content">
//     <div class="channel_userInfo">
//       <img
//       src="<%= user.image %>"
//         alt="profileimage"
//       />
//       <div class="channel_info">
//         <span class="channel_nameUser"><%= user.username %></span>
//         <span class="channel_timeofmsg">today at ${new Date().getHours()}:${new Date().getMinutes()}</span>
//       </div>
//     </div>
//     <div class="channel_actualmsg">
//       <p>
//         ${msg}
//       </p>
//     </div>
//   </div>`;
//     messageContainer.insertAdjacentHTML("afterbegin", msgHTML);
//     textarea.value = "";
//     messageContainer.scrollTop = 0;
//   }
// });

// document.querySelectorAll(".btn-server-image").forEach((server) => {
//   server.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     server.addEventListener("load", async () => {
//       if (serverCreated) {
//         alert("Server created successfully");
//         const response = await fetch("${SERVERURL}channels/2/1", {
//           method: "GET",
//           headers: {
//             "Content-Type": "text/html",
//           },
//         });
//         document.body.innerHTML = await response.text();
//       }
//     });
//   });
// });

// if (servers.length > 0) {
//   servers.forEach((server) => {
//     server.addEventListener("click", (e) => {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//       console.log("HERE");
//       servers.forEach((server) => {
//         server.classList.remove("active");
//       });

//       server.classList.add("active");
//     });
//   });
// }
