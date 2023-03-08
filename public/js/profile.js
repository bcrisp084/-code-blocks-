const submitBtn = document.querySelector("#photo-submit");
const uploadForm = document.querySelector(".image-upload");

function sendData(event) {
  event.preventDefault();
  const newPhoto = new FormData(uploadForm);
  const profileInfo = fetch("/api/image/form", {
    method: "POST",
    body,
    newPhoto,
  });
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.stat);
  }
}

submitBtn.addEventListener("submit", sendData);
