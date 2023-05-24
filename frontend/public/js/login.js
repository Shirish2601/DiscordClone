const btn = document.querySelector(".btn");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const email = document.querySelector(".emailval").value;
  const password = document.querySelector(".passwdval").value;
  const emailContainer = document.querySelector(".passwdval");
  const passwordContainer = document.querySelector(".passwdval");
  try {
    const response = await fetch(`http://localhost:5500/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      document.querySelector(".emailval").value = "";
      document.querySelector(".passwdval").value = "";
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
      passwordContainer.value = "";
      emailContainer.value = "";
      const successAlertHTML = `<div class="alert alert-success top-right-corner">
      <p>Login Successful</p>
    </div>`;
      $(function () {
        $("body").append(successAlertHTML);

        $(".alert").css("opacity", 1);

        setTimeout(function () {
          $(".alert").fadeOut(100, function () {
            $(this).remove();
            window.location.href = "/me/"; // Redirect after the alert has been removed
          });
        }, 200);
      });
    }
  } catch (err) {
    console.log(err);
  }
});
