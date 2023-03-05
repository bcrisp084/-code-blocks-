async function login(event) {
  event.preventDefault();
  const user = {
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    photo: $("#photo").val(),
  };
  console.log("user", user);
  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("The response was good");
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
}

$("#login").on("click", login);
