const form = document.querySelector("#signup-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Pw = sha256(formData.get("password"));
  formData.set("password", sha256Pw);
  console.log(formData.get("password"));

  const res = await fetch("/signup", {
    method: "POST",
    body: formData,
  });
};

form.addEventListener("submit", handleSubmit);
