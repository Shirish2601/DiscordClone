const btn = document.querySelector(".btn");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const email = document.querySelector(".emailval").value;
  const password = document.querySelector(".passwdval").value;
  console.log(email, password);
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      window.location.href = "/me/servers";
    }
  } catch (err) {
    console.log(err);
  }
});
