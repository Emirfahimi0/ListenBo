const getDocumentId = (id) => {
  return document.getElementById(id);
};

const error = getDocumentId("error");
const success = getDocumentId("success");
const container = getDocumentId("container");
const loader = getDocumentId("loader");
const button = getDocumentId("submit");
const form = getDocumentId("form");
const password = getDocumentId("password");
const confirmPassword = getDocumentId("confirm-password");

error.style.display = "none";
success.style.display = "none";
container.style.display = "none";

let token, userId;

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

//fire the event as listener once the DOM is loaded inside the browser
window.addEventListener("DOMContentLoaded", async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, props) => {
      return searchParams.get(props);
    },
  });
  token = params.token;
  userId = params.userId;

  const res = await fetch("/auth/verify-password-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token, userId })
  })

  if (!res.ok) {
    const { error } = await res.json()
    loader.innerHTML = error
    return
  }
  loader.style.display = "none";
  container.style.display = "block";
});

const displayError = (errorMessage) => {
  success.style.display = "none";
  error.innerText = errorMessage
  error.style.display = "block";
}
const displaySuccess = (successMesage) => {
  error.style.display = "none";
  success.innerText = successMesage
  success.style.display = "block";
}

const handleSubmit =async (event) => {
  event.preventDefault();

  if (!password.value.trim()) {
    return displayError("Password is missing")
  }
  if(!passRegex.test(password.value)) {
    return displayError("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character");
  }
  if(password.value !== confirmPassword.value){
    return displayError("confirm password does not match!")
  }

  button.disable = true
  button.innerText = "Please Wait..."

  const res = await fetch("/auth/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token,userId,password:password.value })
  })

  button.disable = false
  button.innerText = "Reset Password"

  
  if (!res.ok) {
    const { error } = await res.json()
    return displayError(error)
  }

  displaySuccess("Your password has been updated successfully!")
  password.value = "";
  confirmPassword.value ="";
}
form.addEventListener("submit", handleSubmit)