const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmedPassword");

function signup(event) {
  event.preventDefault();
  const user = {
    username: $("#username").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
  };

  if (!user.username || !user.email || !user.password) {
    return;
  }
  if (user.password !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  userLogin(user);
}

async function userLogin(userData) {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("The response was good");
    // If successful, redirect the browser to the profile page
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
}

document.getElementById("signup").addEventListener("click", signup);
