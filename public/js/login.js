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
      throw new Error("Login failed!");
    } else {
      window.location.href = "/me/";
    }
  } catch (err) {
    console.log(err);
  }
});
