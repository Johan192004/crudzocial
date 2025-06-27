const sessionUser = sessionStorage.getItem("user");
if (!sessionUser) {
  window.location.href = "login.html";
}

