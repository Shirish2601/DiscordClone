const button = document.querySelector(".btn");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  let userName = document.querySelector(".nameval");
  let userPassword = document.querySelector(".passwdval");
  let userEmail = document.querySelector(".emailval");
  userName = userName.value;
  userPassword = userPassword.value;
  userEmail = userEmail.value;

  userName = userName.trim();
  userPassword = userPassword.trim();
  userEmail = userEmail.trim();
  try {
    const response = await fetch(`http://localhost:5500/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: userPassword,
        email: userEmail,
      }),
    });
    document.querySelector(".nameval").value = "";
    document.querySelector(".passwdval").value = "";
    document.querySelector(".emailval").value = "";
    if (!response.ok) {
      const error = await response.json();
      const alertHTML = `<div class="alert alert-error top-right-corner">
      <p>${error.message}</p>
    </div>`;

      $(function () {
        $("body").append(alertHTML);

        $(".alert").css("opacity", 1);

        setTimeout(function () {
          $(".alert").fadeOut(1000, function () {
            $(this).remove();
          });
        }, 2000);
      });
    } else {
      const successAlertHTML = `<div class="alert alert-success top-right-corner">
      <p>Registration Successful</p>
    </div>`;
      $(function () {
        $("body").append(successAlertHTML);

        $(".alert").css("opacity", 1);

        setTimeout(function () {
          $(".alert").fadeOut(700, function () {
            $(this).remove();
            window.location.href = "/me/";
          });
        }, 600);
      });
      window.location.href = "/me/";
    }
  } catch (err) {
    console.log(err);
  }
});
