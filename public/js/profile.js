$(document).ready(function () {
  const submitBtn = document.querySelector("#photo-submit");
  const uploadForm = document.querySelector(".image-upload");
  const favorties = document.querySelector("#favorites");
  const myUploadsBtn = document.querySelector(".my-uploads");

  async function sendData(event) {
    event.preventDefault();
    const newPhoto = new FormData(uploadForm);
    const response = await fetch("/api/image/form", {
      method: "POST",
      body: newPhoto,
    });
    if (response.ok) {
      console.log("response", response.status);
      document.location.replace("/profile");
    } else {
      alert(response.stat);
    }
  }
  $(".my-faves").on("click", function (event) {
    event.preventDefault();
    $("#profile-uploads").addClass("display-type");
    $("#favorites").removeClass("display-type");
  });
  $(".my-uploads").on("click", function (event) {
    event.preventDefault();
    $("#profile-uploads").removeClass("display-type");
    $("#favorites").addClass("display-type");
  });

  submitBtn.addEventListener("submit", sendData);
});
