async function logout(event) {
  event.preventDefault();
  const response = await fetch("/api/user/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("You are now logged out");
    document.location.replace("/");
  } else {
    alert(response);
  }
}

$(".logout").on("click", logout);
