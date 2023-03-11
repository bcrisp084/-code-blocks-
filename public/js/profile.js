$(document).ready(function () {
  const submitBtn = document.querySelector("#photo-submit");
  const uploadForm = document.querySelector(".image-upload");

  async function sendData(event) {
    event.preventDefault();
    const newPhoto = new FormData(uploadForm);
    const response = await fetch("/api/image/form", {
      method: "POST",
      body: newPhoto,
    });
    console.log("frontend-response", response);

    if (response.ok) {
      console.log("the response is ok");
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
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

  submitBtn.addEventListener("click", sendData);
});
