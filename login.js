const btn = document.querySelector(".btn");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const email = document.querySelector(".emailval").value;
  const password = document.querySelector(".passwdval").value;

  try {
    const response = await fetch("http://localhost:5500/api/user/login", {
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
      window.location.href = "./sidebar.html";
    }
  } catch (err) {
    console.log(err);
  }
});
