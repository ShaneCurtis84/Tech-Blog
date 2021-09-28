const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document
    .querySelector("#username")
    .value.trim()
    .toUpperCase();
  const password = document.querySelector("#password").value;

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Unable to login!");
    }
  }
};

document
  .querySelector("#log-in-btn")
  .addEventListener("click", loginFormHandler);
