const btn = document.querySelector(".btn");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const email = document.querySelector(".emailval").value;
  const password = document.querySelector(".passwdval").value;
  try {
    const response = await fetch("http://localhost:5500/login", {
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
      email.value = "";
      password.value = "";
      const alertHTML = ``;
      document.body.insertAdjacentHTML;
    } else {
      email.value = "";
      password.value = "";
      window.location.href = "/me/";
    }
  } catch (err) {
    console.log(err);
  }
});
