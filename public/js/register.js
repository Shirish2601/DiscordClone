const button = document.querySelector(".btn");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  let userName = document.querySelector(".nameval").value;
  let userPassword = document.querySelector(".passwdval").value;
  let userEmail = document.querySelector(".emailval").value;

  // remove whitespaces
  userName = userName.trim();
  userPassword = userPassword.trim();
  userEmail = userEmail.trim();
  console.log(userName, userPassword, userEmail);
  try {
    const response = await fetch("http://localhost:5500/register", {
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

    if (!response.ok) {
      throw new Error("Signup Failed!");
    } else {
      window.location.href = "/me/";
    }
  } catch (err) {
    console.log(err);
  }
});
