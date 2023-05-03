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

const addServerButton = document.querySelector(".add-icon-btn");
const servers = document.querySelectorAll(".btn-server-image");
const discordContainer = document.querySelector(".discord-container");

let serverLogo = "";
let serverCreated = false;

const popupRemover = (discordContainer, popup) => {
  discordContainer.style.cssText = "opacity: 1";
  if (popup) popup.remove();
  const cssLinkTag = document.querySelector(
    "link[href='http://localhost:5500/getpopup.css']"
  );
  if (cssLinkTag) cssLinkTag.remove();
};

const linkChecker = (link) => {
  if (document.querySelector(`${link}`)) return true;
  return false;
};

addServerButton.addEventListener("click", async (e) => {
  const existingPopup = document.querySelector(".popup");
  let link = "link[href='http://localhost:5500/getpopup.css']";
  let check = linkChecker("link[href='http://localhost:5500/getpopup.css']");

  history.replaceState(null, null, "/");

  if (check) link.remove();

  e.preventDefault();
  e.stopImmediatePropagation();

  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.body.appendChild(document.createElement("div"));
  document.body.insertBefore(popup, document.body.firstChild);

  popup.classList.add("popup");
  try {
    const response = await fetch("http://localhost:5500/getpopup", {
      method: "GET",
      headers: {
        "Content-Type": "text/html",
      },
    });

    const data = await response.text();
    popup.innerHTML = data;

    link = `<link rel="stylesheet" href="http://localhost:5500/getpopup.css">`;
    document.head.insertAdjacentHTML("beforeend", link);
    discordContainer.style.cssText = "opacity: 0.5";

    discordContainer.addEventListener("click", () => {
      popupRemover(discordContainer, popup);
    });

    const backBtn = document.querySelector(".create-server__button.back");
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      popupRemover(discordContainer, popup);
    });

    const imgSelector = document.querySelector("#imageupload");

    imgSelector.addEventListener("change", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        serverLogo = reader.result;
        const imgByUser = document.querySelector("#imageUploadedByUser");
        imgByUser.setAttribute("src", serverLogo);
        imgByUser.style.cssText = "width: 80px; height: 80px;";
        document
          .querySelector(".upload-server__logo span")
          .classList.add("inactive");
      });
      reader.readAsDataURL(imgSelector.files[0]);
    });

    const createBtn = document.querySelector(".create-server__button.create");
    createBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const serverName = document.querySelector(
        ".upload-server__name input"
      ).value;

      if (serverName === "") {
        alert("Please enter a server name");
        return;
      }

      const serverLogoPath = document.querySelector(
        ".upload-server__logo input"
      ).value;

      if (serverLogoPath === "") {
        alert("Please enter a server logo");
        return;
      }

      if (serverLogo && serverName) {
        const serverHTML = `<a href="/channels/s1/c1/" class="btn-server-image ">
        <img class="server" src="${serverLogo}" alt="server" />
        </a>`;
        document
          .querySelector(".sidebar-servers")
          .insertAdjacentHTML("afterbegin", serverHTML);

        const serverList = document.querySelectorAll(".btn-server-image");
        serverList.forEach((server, index) => {
          if (index === 0) server.classList.add("active");
          else {
            server.classList.remove("active");
          }
        });
        serverCreated = true;

        await getChannels().then(() => {
          history.pushState(null, null, "/channels/s1/c1/");
          popupRemover(discordContainer, popup);
        });
      }
      popupRemover(discordContainer, popup);
    });
  } catch (err) {
    console.log(err);
  }
});

const getChannels = async () => {
  const linkAlreadyExists = document.querySelector(
    "link[href='http://localhost:5500/channels/']"
  );
  if (linkAlreadyExists) linkAlreadyExists.remove();

  const response = await fetch("http://localhost:5500/channels/2/1", {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
  });
  discordContainer.insertAdjacentHTML("beforeend", await response.text());

  const link = `<link rel="stylesheet" href="http://localhost:5500/channels/">`;
  document.head.insertAdjacentHTML("beforeend", link);
};

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

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", async (e) => {
    const btnServerImage = e.target.closest(".btn-server-image");
    if (btnServerImage) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const response = await fetch("http://localhost:5500/gettextarea", {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
        },
      });
      const data = await response.text();
      const link = `<link rel="stylesheet" href="http://localhost:5500/gettextarea.css">`;
      if (linkChecker("link[href='http://localhost:5500/gettextarea.css']"))
        link.remove();

      document.head.insertAdjacentHTML("beforeend", link);
      discordContainer.insertAdjacentHTML("beforeend", data);

      const serverImages = document.querySelectorAll(".btn-server-image");
      serverImages.forEach((serverImage) => {
        serverImage.classList.remove("active");
      });

      btnServerImage.classList.add("active");
    }
  });
});

// textarea event
document.addEventListener("input", (e) => {
  if (e.target.matches("#msgarea")) {
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
        src="https://cdn.discordapp.com/attachments/1035612834190590043/1088491513878696026/avatar.png"
        alt="profileimage"
      />
      <div class="channel_info">
        <span class="channel_nameUser">Shirish</span>
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
  }
});
// document.querySelectorAll(".btn-server-image").forEach((server) => {
//   server.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     server.addEventListener("load", async () => {
//       if (serverCreated) {
//         alert("Server created successfully");
//         const response = await fetch("http://localhost:5500/channels/2/1", {
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
