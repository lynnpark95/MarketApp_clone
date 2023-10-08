const form = document.getElementById("addItem-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  await fetch("/items", {
    method: "POST",
    body: new FormData(form),
  });
  console.log("submitted");
};

form.addEventListener("submit", handleSubmit);
