


const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim().toUpperCase();
  const password = document.querySelector('#password').value;

  if (username && password) {
    const response = await fetch('/api/users', {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Unable to sign you up!');
      return
    }
  } else if (password < 8) {
    alert('Password must be 8 or more characters!')
    return
  }
};

document.querySelector('#sign-up-btn').addEventListener('click', signupFormHandler);