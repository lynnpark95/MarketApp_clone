const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password = formData.get("password");
  const pwConfirm = formData.get("pwConfirm");
  if (password === pwConfirm) {
    return true;
  } else {
    false;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Pw = sha256(formData.get("password"));
  formData.set("password", sha256Pw);
  console.log(formData.get("password"));

  const div = document.querySelector("#pwCheck");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    //only display success message when you get 200 message
    const data = await res.json();
    if (data === "200") {
      div.innerText = "Thanks for signing up♥";
      div.style.color = "blue";
    }
  } else {
    div.innerText = "Passwords are not matching.";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
